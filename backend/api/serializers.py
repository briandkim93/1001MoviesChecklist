from rest_framework.serializers import ModelSerializer

from .models import Account

class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        new_account = Account(
            username = validated_data['username'],
            email = validated_data['email']
        )
        new_account.set_password(validated_data['password'])
        new_account.save()
        return new_account