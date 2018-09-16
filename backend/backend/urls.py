from django.contrib import admin
from django.urls import path, include

from oauth2_provider import views as oauth2_provider_views

from .confidential import ADMIN_URL
from .views import api_root

urlpatterns = [
    path('', include(('api.urls', 'api'), namespace='api')),
    
    path('api/', api_root),

    path('', include('social_django.urls', namespace='social')),
    path('api/auth/social/authorize/', oauth2_provider_views.AuthorizationView.as_view(), name='authorize'),

    path(ADMIN_URL, admin.site.urls)
]
