from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.core.validators import RegexValidator
from django.utils.translation import ugettext_lazy as _


class Account(AbstractUser):
    class Meta:
        verbose_name = 'Account'
    username = models.CharField(_('username'), max_length=30, unique=True,
    help_text=_('Required. 30 characters or fewer. Letters, digits, periods, and underscores only.'),
    validators=[
        RegexValidator(r'^[\w.]+$', _('Username may only contain letters, numbers, periods, and underscores.'), 'invalid'),
    ],
    error_messages={
        'unique': _("Username already exists."),
    })
    email = models.EmailField(unique=True)
    completed_movies = models.ManyToManyField('Movie', blank=True)

class Movie(models.Model):
    title = models.CharField(max_length=255)
    image_path = models.FilePathField(path='{}/backend/static/images/movie-posters'.format(settings.BASE_DIR))
    summary = models.TextField(max_length=1000)
    release_year = models.CharField(max_length=4)
    length = models.CharField(max_length=8)
    genres = models.CharField(max_length=80)
    imdb_url = models.URLField(max_length=50)

    def __str__(self):
        return self.title