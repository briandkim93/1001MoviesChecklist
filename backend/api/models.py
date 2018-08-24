from django.db import models
from django.contrib.auth.models import AbstractUser

class Account(AbstractUser):
    class Meta:
        verbose_name = 'Account'
    pass;