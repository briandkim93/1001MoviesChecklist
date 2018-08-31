# Generated by Django 2.1 on 2018-08-31 22:44

import django.contrib.auth.models
import django.core.validators
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0009_alter_user_last_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(error_messages={'unique': 'Username is already taken.'}, help_text='Required. 30 characters or fewer. Letters, digits, periods, and underscores only.', max_length=30, unique=True, validators=[django.core.validators.RegexValidator('^[\\w.]+$', 'Username may only contain letters, numbers, periods, and underscores.', 'invalid')], verbose_name='username')),
                ('email', models.EmailField(error_messages={'unique': 'Email address is already taken.'}, max_length=254, unique=True)),
            ],
            options={
                'verbose_name': 'Account',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('image_path', models.FilePathField(path='/Users/bk/Documents/projects/1001MoviesChecklist/backend/backend/static/images/movie-posters')),
                ('summary', models.TextField(max_length=1000)),
                ('release_year', models.CharField(max_length=4)),
                ('length', models.CharField(max_length=8)),
                ('genres', models.CharField(max_length=80)),
                ('imdb_url', models.URLField(max_length=50)),
            ],
        ),
        migrations.AddField(
            model_name='account',
            name='completed_movies',
            field=models.ManyToManyField(blank=True, to='api.Movie'),
        ),
        migrations.AddField(
            model_name='account',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='account',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
    ]
