from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.utils.translation import ugettext_lazy as _
from django.views.decorators.debug import sensitive_post_parameters

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from knox.views import LoginView as KnoxLoginView

from .authentications import BasicAuthentication403
from .models import Account, Movie
from .permissions import UpdateAccountPermission, RetrieveAccountListPermission, UpdateMoviesPermission, SendVerificationEmailPermission
from .serializers import AccountSerializer, MovieSerializer, EmailVerifySerializer, EmailVerifyConfirmSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer

class AccountViewSet(ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()
    permission_classes = (UpdateAccountPermission, RetrieveAccountListPermission)

class LoginView(KnoxLoginView):
    authentication_classes = (BasicAuthentication403, )

class MovieViewSet(ModelViewSet):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    permission_classes = (UpdateMoviesPermission, )

class EmailVerifyView(GenericAPIView):
    serializer_class = EmailVerifySerializer
    permission_classes = (SendVerificationEmailPermission, )

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": _("Verification email has been sent.")},
            status=status.HTTP_200_OK
        )

class EmailVerifyConfirmView(GenericAPIView):
    serializer_class = EmailVerifyConfirmSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": _("Email has been verified.")},
            status=status.HTTP_200_OK
        )

# Source: django-rest-auth
sensitive_post_parameters_m = method_decorator(
    sensitive_post_parameters(
        'password', 'old_password', 'new_password1', 'new_password2'
    )
)

# Source: django-rest-auth
class PasswordResetView(GenericAPIView):
    serializer_class = PasswordResetSerializer
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()
        return Response(
            {"detail": _("Password reset email has been sent.")},
            status=status.HTTP_200_OK
        )

# Source: django-rest-auth
class PasswordResetConfirmView(GenericAPIView):
    serializer_class = PasswordResetConfirmSerializer
    permission_classes = (AllowAny, )

    @sensitive_post_parameters_m
    def dispatch(self, *args, **kwargs):
        return super(PasswordResetConfirmView, self).dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": _("Password has been reset with the new password.")}
        )