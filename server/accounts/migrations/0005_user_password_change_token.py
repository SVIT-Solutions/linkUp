# Generated by Django 4.2.9 on 2024-01-19 22:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_user_verification_token'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='password_change_token',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]