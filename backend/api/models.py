from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class Account(AbstractUser):
    class Meta:
        verbose_name = 'Account'
    username = models.CharField(
        max_length=30, 
        unique=True,
        help_text=_('Required. 30 characters or fewer. Letters, digits, periods, and underscores only.'),
        validators=[
            RegexValidator(r'^[\w.]+$', _('Username may only contain letters, numbers, periods, and underscores.'), 'invalid'),
        ],
        error_messages={
            'unique': _("Username is already taken."),
        }
    )
    email = models.EmailField(
        unique=True, 
        error_messages={
            'unique': _("Email address is already taken."),
        }
    )
    email_verified = models.BooleanField(default=False)
    email_verification_code = models.CharField(max_length=255)
    completed_movies = models.ManyToManyField('Movie', blank=True)
    active = models.BooleanField(default=True)
    facebook_id = models.CharField(max_length=30, blank=True)
    provider = models.CharField(max_length=30, blank=True)

class Movie(models.Model):
    title = models.CharField(max_length=255)
    image_filename = models.CharField(max_length=255)
    summary = models.TextField(max_length=1000)
    release_year = models.CharField(max_length=4)
    length = models.CharField(max_length=8)
    genres = models.CharField(max_length=80)
    imdb_url = models.URLField(max_length=50)

    def __str__(self):
        return self.title