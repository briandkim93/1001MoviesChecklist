from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import BasicAuthentication
from knox.views import LoginView as KnoxLoginView

from .serializers import AccountSerializer, MovieSerializer
from .models import Account, Movie
from .permissions import UpdateAccountPermission, RetrieveAccountListPermission, UpdateMoviesPermission

class AccountViewSet(ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()
    permission_classes = (UpdateAccountPermission, RetrieveAccountListPermission)

class LoginView(KnoxLoginView):
    authentication_classes = (BasicAuthentication, )

class MovieViewSet(ModelViewSet):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    permission_classes = (UpdateMoviesPermission, )