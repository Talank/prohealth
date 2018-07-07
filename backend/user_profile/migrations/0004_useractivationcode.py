# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-07-04 18:08
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0003_auto_20180702_1752'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserActivationCode',
            fields=[
                ('code', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='activation_codes', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'default_related_name': 'activation_codes',
            },
        ),
    ]