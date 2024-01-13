from django.contrib import admin

from permissions.models import AccessPermissionDomain


class AccessPermissionDomainAdmin(admin.ModelAdmin):
    list_display = ("domain",)

admin.site.register(AccessPermissionDomain, AccessPermissionDomainAdmin)