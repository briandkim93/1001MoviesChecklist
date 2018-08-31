from django.contrib import admin
from django.urls import path, include
from knox import views as knox_views
from rest_auth import views as rest_auth_views
from api.views import LoginView

from .confidential import ADMIN_URL

urlpatterns = [
    path('api/', include('api.urls')),
    
    path('api/auth/login/', LoginView.as_view(), name='knox_login'),
    path('api/auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    
    path('', include('django.contrib.auth.urls')),
    path('api/auth/password/reset/', rest_auth_views.PasswordResetView.as_view(), name='rest_auth_passwordreset'),
    
    path(ADMIN_URL, admin.site.urls),
]
