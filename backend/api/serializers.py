from django.core import exceptions
from django.contrib.auth.password_validation import validate_password
from django.utils.translation import gettext as _
from rest_framework.serializers import ModelSerializer, ValidationError

from .models import Account, Movie

from rest_framework import serializers
from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings

class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
        read_only_fields = ('id', 'last_login', 'is_superuser', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined', 'groups', 'user_permissions')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        account = Account(username=validated_data['username'], email=validated_data['email'])
        account.set_password(validated_data['password'])
        account.save()
        return account

    def update(self, instance, validated_data):
        instance.email = validated_data['email']
        instance.set_password(validated_data['password'])
        instance.save()
        return instance

    def validate_password(self, value):
        validate_password(password=value)
        return value

class MovieSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password_reset_form_class = PasswordResetForm

    def validate_email(self, value):
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(_('Error'))
        if not Account.objects.filter(email=value).exists():
            raise serializers.ValidationError(_('Invalid e-mail address'))
        return value

    def save(self):
        request = self.context.get('request')
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
            'email_template_name': 'password-reset-message.txt',
            'request': request,
        }
        self.reset_form.save(**opts)





