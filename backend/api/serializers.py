from django.core import exceptions
from django.contrib.auth.password_validation import validate_password
from django.utils.translation import gettext as _
from rest_framework.serializers import ModelSerializer, ValidationError

from .models import Account, Movie

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