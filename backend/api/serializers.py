from hashlib import sha256
from secrets import token_bytes

from django.conf import settings
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import default_token_generator
from django.core import exceptions
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode as uid_decoder
from django.utils.translation import ugettext as _

from rest_framework import serializers

from .models import Account, Movie

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = (
            'id', 
            'username', 
            'password', 
            'email', 
            'email_verified', 
            'email_verification_code', 
            'completed_movies', 
            'date_joined', 
            'last_login', 
            'is_superuser', 
            'is_staff', 
            'active'
        )
        read_only_fields = (
            'id', 
            'email_verified', 
            'email_verification_code', 
            'date_joined', 
            'last_login', 
            'is_superuser', 
            'is_staff'
        )
        extra_kwargs = {'password': {'write_only': True}}

    def create_verification_code(self, email):
        salt = token_bytes(32).hex()
        email_verification_code = sha256((salt + email).encode('utf-8')).hexdigest()
        return email_verification_code

    def create(self, validated_data):
        email_verification_code = self.create_verification_code(validated_data['email'])
        account = Account(
            username=validated_data['username'], 
            email=validated_data['email'], 
            email_verification_code=email_verification_code
        )
        account.set_password(validated_data['password'])
        account.save()
        message = render_to_string('email_verification_message.txt', {'email_verification_code': email_verification_code})
        send_mail(
            'Welcome to 1001 Movies Checklist',
            message,
            'no-reply@1001movieschecklist.com',
            (validated_data['email'], ),
            fail_silently=True
        )
        return account

    def update(self, instance, validated_data):
        try: 
            if instance.email != validated_data['email']:
                instance.email = validated_data['email']
                instance.email_verified = False
                email_verification_code = self.create_verification_code(validated_data['email'])
                instance.email_verification_code = email_verification_code
        except KeyError:
            pass;
        try:
            instance.set_password(validated_data['password'])
        except KeyError:
            pass;
        try: 
            if instance.active != validated_data['active']:
                instance.active = validated_data['active']
        except KeyError:
            pass;
        instance.save()
        return instance

    def validate_password(self, value):
        validate_password(password=value)
        return value

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class EmailVerifySerializer(serializers.Serializer):
    def save(self):
        request = self.context.get("request")
        account = Account.objects.get(username=request.user)
        message = render_to_string('email_verification_message.txt', {'email_verification_code': account.email_verification_code})
        send_mail(
            'Verify your 1001 Movies Checklist account',
            message,
            'no-reply@1001movieschecklist.com',
            (account.email, ),
            fail_silently=True
        )

    def validate(self, data):
        try:
            request = self.context.get("request")
            account = Account.objects.get(username=request.user)
            if account.email_verified:
                raise serializers.ValidationError({'email_verified': _('This email has already been verified.')})
        except Account.DoesNotExist:
            raise serializers.ValidationError({'token': ['Authentication credentials were not provided.']})
        return data

class EmailVerifyConfirmSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255)
    email_verification_code = serializers.CharField(max_length=255)
    
    def save(self):
        account = Account.objects.get(email_verification_code=self.data.get('email_verification_code'))
        account.email_verified = True
        account.email_verification_code = ''
        account.save()
    
    def validate(self, data):
        try:
            account = Account.objects.get(email_verification_code=self.initial_data.get('email_verification_code'))
        except Account.DoesNotExist:
            raise serializers.ValidationError({'email_verification_code': ['Invalid verification code.']})
        if account.username != data.get('username') or not account.check_password(data.get('password')):
            raise serializers.ValidationError({'token': ['Invalid username or password.']})
        return data

# Source: django-rest-auth (https://github.com/Tivix/django-rest-auth)
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    password_reset_form_class = PasswordResetForm

    def save(self):
        request = self.context.get('request')
        opts = {
            'from_email': 'no-reply@1001movieschecklist.com',
            'email_template_name': 'password_reset_message.txt',
            'request': request,
        }
        self.reset_form.save(**opts)

    def validate_email(self, value):
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(_('Error'))
        if not Account.objects.filter(email=value).exists():
            raise serializers.ValidationError(_('Invalid email address'))
        return value

# Source: django-rest-auth (https://github.com/Tivix/django-rest-auth)
class PasswordResetConfirmSerializer(serializers.Serializer):
    new_password1 = serializers.CharField(max_length=128)
    new_password2 = serializers.CharField(max_length=128)
    uid = serializers.CharField()
    token = serializers.CharField()

    set_password_form_class = SetPasswordForm

    def save(self):
        return self.set_password_form.save()

    def custom_validation(self, attrs):
        pass

    def validate(self, attrs):
        self._errors = {}
        try:
            uid = force_text(uid_decoder(attrs['uid']))
            self.user = Account._default_manager.get(pk=uid)
        except (TypeError, ValueError, OverflowError, Account.DoesNotExist):
            raise serializers.ValidationError({'uid': ['Invalid value']})
        self.custom_validation(attrs)
        self.set_password_form = self.set_password_form_class(user=self.user, data=attrs)
        if not self.set_password_form.is_valid():
            raise serializers.ValidationError(self.set_password_form.errors)
        if not default_token_generator.check_token(self.user, attrs['token']):
            raise serializers.ValidationError({'token': ['Invalid value']})
        return attrs