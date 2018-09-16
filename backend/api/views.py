import json

from django.contrib.auth.signals import user_logged_in
from django.utils.decorators import method_decorator
from django.utils.translation import ugettext_lazy as _
from django.views.decorators.debug import sensitive_post_parameters

from rest_framework import status
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from knox.models import AuthToken
from knox.settings import knox_settings
from knox.views import LoginView as KnoxLoginView

from oauth2_provider.models import AccessToken

from rest_framework_social_oauth2.views import ConvertTokenView

from .authentications import BasicAuthentication403
from .models import Account, Movie
from .permissions import AccountListPermission, AccountDetailPermission, MoviePermission, SendVerificationEmailPermission
from .serializers import AccountSerializer, MovieSerializer, EmailVerifySerializer, EmailVerifyConfirmSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer

class AccountListView(ListCreateAPIView):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()
    permission_classes = (AccountListPermission, )

class AccountDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = AccountSerializer
    permission_classes = (AccountDetailPermission, )

    def get_queryset(self):
        return Account.objects.all().filter(username=self.request.user)

class MovieListView(ListCreateAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    permission_classes = (MoviePermission, )

class MovieDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    permission_classes = (MoviePermission, )

# Source: django-rest-knox v3.1.5 (https://github.com/James1345/django-rest-knox)
class LoginView(APIView):
    authentication_classes = (BasicAuthentication403, )
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        token = AuthToken.objects.create(request.user)
        user_logged_in.send(sender=request.user.__class__, request=request, user=request.user)
        UserSerializer = knox_settings.USER_SERIALIZER
        context = {'request': self.request, 'format': self.format_kwarg, 'view': self}
        account = request.user
        account.active = True
        account.save()
        return Response({
            'user': UserSerializer(request.user, context=context).data,
            'token': token,
        })

class EmailVerifyView(GenericAPIView):
    serializer_class = EmailVerifySerializer
    permission_classes = (SendVerificationEmailPermission, )

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": _("Verification email has been sent.")})

class EmailVerifyConfirmView(GenericAPIView):
    serializer_class = EmailVerifyConfirmSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": _("Email has been verified.")})

# Source: django-rest-auth v0.9.3 (https://github.com/Tivix/django-rest-auth)
sensitive_post_parameters_m = method_decorator(
    sensitive_post_parameters(
        'password', 
        'old_password', 
        'new_password1', 
        'new_password2'
    )
)

# Source: django-rest-auth v0.9.3 (https://github.com/Tivix/django-rest-auth)
class PasswordResetView(GenericAPIView):
    serializer_class = PasswordResetSerializer
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": _("Password reset email has been sent.")})

# Source: django-rest-auth v0.9.3 (https://github.com/Tivix/django-rest-auth)
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
        return Response({"detail": _("Password has been reset with the new password.")})

# Source: django-rest-framework-social-oauth2 1.1.0 (https://github.com/RealmTeam/django-rest-framework-social-oauth2)
class ConvertTokenFBView(ConvertTokenView):
    def post(self, request, *args, **kwargs):
        try:
            try:
                account = Account.objects.get(facebook_id=request.data['facebook_id'])
            except Account.DoesNotExist:
                account = Account.objects.get(email=request.data['email'])
                account.facebook_id = request.data['facebook_id']
            if account.provider == 'facebook':
                raise KeyError
            if account.email == request.data['email']:
                account.email_verified = True
            account.provider = 'facebook-local'
            account.active = True
            account.save()
            token = AuthToken.objects.create(account)
            user_logged_in.send(sender=account.__class__, request=request, user=account)
            user_info = {
                'id': account.id,
                'username': account.username,
                'email': account.email,
                'email_verified': account.email_verified,
                'date_joined': account.date_joined,
                'provider': account.provider 
            }
            response = Response({
                'access_token': token,
                'user': user_info,
            })
            return response
        except (KeyError, Account.DoesNotExist):
            request._request.POST = request._request.POST.copy()
            for key, value in request.data.items():
                request._request.POST[key] = value
            url, headers, body, status = self.create_token_response(request._request)
            response = Response(data=json.loads(body), status=status)
            print(response.data)
            account = AccessToken.objects.get(token=response.data['access_token']).user
            account.facebook_id = request.data['facebook_id']
            account.email_verified = True
            account.active = True
            account.provider = 'facebook'
            account.save()
            user_info = {
                'id': account.id,
                'username': account.username,
                'email': account.email,
                'email_verified': account.email_verified,
                'date_joined': account.date_joined,
                'provider': account.provider 
            }
            response.data['user'] = user_info
            for k, v in headers.items():
                response[k] = v
            return response