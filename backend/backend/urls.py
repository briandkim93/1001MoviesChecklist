from django.contrib import admin
from django.urls import path, include

from .confidential import ADMIN_URL

urlpatterns = [
    path('api/', include('api.urls')),
    path(ADMIN_URL, admin.site.urls),
]
