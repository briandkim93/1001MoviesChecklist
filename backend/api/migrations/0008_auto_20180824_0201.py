# Generated by Django 2.1 on 2018-08-24 02:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20180824_0200'),
    ]

    operations = [
        migrations.RenameField(
            model_name='movie',
            old_name='user',
            new_name='account',
        ),
    ]
