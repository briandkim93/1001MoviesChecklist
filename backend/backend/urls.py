from django.contrib import admin
from django.urls import path, include

from knox import views as knox_views
from oauth2_provider import views as oauth2_provider_views
from rest_framework_social_oauth2 import views as social_oauth2_views

from .confidential import ADMIN_URL
from .views import api_root
from api.views import EmailVerifyView, EmailVerifyConfirmView, PasswordResetView, PasswordResetConfirmView, LoginView, ConvertTokenFBView

social_urlpatterns = [
    path('', include('social_django.urls')),
    path('', include('rest_framework_social_oauth2.urls'))
]

urlpatterns = [
    path('api/', include('api.urls')),

    path('api/auth/', api_root),

    path('api/auth/email/verify/', EmailVerifyView.as_view(), name='email_verify'),
    path('api/auth/email/verify/confirm/', EmailVerifyConfirmView.as_view(), name='email_verify_confirm'),
    
    path('api/auth/password/reset/', PasswordResetView.as_view(), name='password_reset'),
    path('api/auth/password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('api/auth/login/', LoginView.as_view(), name='knox_login'),
    path('api/auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    
    path('', include('social_django.urls', namespace="social")),
    path('api/auth/social/authorize/', oauth2_provider_views.AuthorizationView.as_view(), name="authorize"),
    path('api/auth/social/convert-token/', ConvertTokenFBView.as_view(), name="convert_token"),
    path('api/auth/social/revoke-token/', social_oauth2_views.RevokeTokenView.as_view(), name="revoke_token"),

    path(ADMIN_URL, admin.site.urls)
]
