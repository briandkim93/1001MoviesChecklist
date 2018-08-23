from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .serializers import AccountSerializer
from .models import Account

class AccountViewSet(ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()