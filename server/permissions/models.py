from django.db import models


class AccessPermissionDomain(models.Model):
    domain = models.CharField(max_length=255)

    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.domain