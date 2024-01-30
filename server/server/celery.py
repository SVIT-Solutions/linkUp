from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings.dev")

app = Celery('server')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.imports = ("accounts.tasks")

app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
