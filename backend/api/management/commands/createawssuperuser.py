import os

from django.core.management.base import BaseCommand

from api.models import Account

class Command(BaseCommand):
    def handle(self, *args, **options):
        username = os.environ['SUPERUSER_USERNAME']
        email = os.environ['SUPERUSER_EMAIL']
        password = os.environ['SUPER_USER_PASSWORD']
        if not Account.objects.filter(username=username).exists() and not Account.objects.filter(email=email).exists():
            Account.objects.create_superuser(username, email, password)