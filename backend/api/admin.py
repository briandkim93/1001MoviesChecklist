from django.contrib import admin

from .models import Account, Movie

admin.site.register(Account)
admin.site.register(Movie)