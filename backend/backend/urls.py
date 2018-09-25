from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView

from oauth2_provider import views as oauth2_provider_views

from .confidential import ADMIN_URL
from .views import api_root

urlpatterns = [
    path('', include(('api.urls', 'api'), namespace='api')),
    
    path('api/', api_root),

    path('', include('social_django.urls', namespace='social')),
    path('api/auth/social/authorize/', oauth2_provider_views.AuthorizationView.as_view(), name='authorize'),

    path(ADMIN_URL, admin.site.urls),

    # PRODUCTION SETTINGS #
    re_path('.*', TemplateView.as_view(template_name='index.html'))
]