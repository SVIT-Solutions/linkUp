from django.contrib import admin
from .models import User, UserProfile

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False

class UserAdmin(admin.ModelAdmin):
    inlines = [UserProfileInline]

admin.site.register(User, UserAdmin)