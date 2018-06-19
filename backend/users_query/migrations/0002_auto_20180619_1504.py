# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-06-19 15:04
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users_query', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userquery',
            name='appointment',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users_query.Appointment'),
        ),
        migrations.AlterField(
            model_name='userquery',
            name='prescription',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users_query.Prescription'),
        ),
    ]
