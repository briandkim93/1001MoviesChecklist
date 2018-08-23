from django.contrib import admin
from django.urls import path

from .confidential import ADMIN_URL

urlpatterns = [
    path(ADMIN_URL, admin.site.urls),
]
