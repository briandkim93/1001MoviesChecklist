from django.shortcuts import render
from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser

from .serializers import AccountSerializer, MovieSerializer
from .models import Account, Movie
from .permissions import UpdateAccountPermission

class AccountViewSet(ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()
    authentication_classes = (TokenAuthentication, )
    permission_classes = (UpdateAccountPermission, )

class LoginViewSet(ViewSet):
    serializer_class = AuthTokenSerializer
    
    def create(self, request):
        return ObtainAuthToken().post(request)

class MovieViewSet(ModelViewSet):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAdminUser, )