from django.contrib import admin
from django.urls import path, include

from knox import views as knox_views

from api.views import LoginView, EmailVerifyView, EmailVerifyConfirmView, PasswordResetView, PasswordResetConfirmView
from .confidential import ADMIN_URL

urlpatterns = [
    path('api/', include('api.urls')),

    path('api/auth/email/verify/', EmailVerifyView.as_view(), name='email_verify'),
    path('api/auth/email/verify/confirm', EmailVerifyConfirmView.as_view(), name='email_verify_confirm'),
    
    path('api/auth/password/reset/', PasswordResetView.as_view(), name='password_reset'),
    path('api/auth/password/reset/confirm', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('api/auth/login/', LoginView.as_view(), name='knox_login'),
    path('api/auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    
    path(ADMIN_URL, admin.site.urls),
]
