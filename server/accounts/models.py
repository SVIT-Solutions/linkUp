import os
from uuid import uuid4
from io import BytesIO
from PIL import Image
from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save
from .managers import UserManager, UserManagerAll

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=36)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    verification_token = models.CharField(max_length=255, blank=True, null=True, unique=True)
    password_change_token = models.CharField(max_length=255, blank=True, null=True, unique=True)

    objects = UserManager()

    objects_all = UserManagerAll()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"
        ordering = ["-id"]


def avatar_upload_to(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid4()}.{ext}"
    return os.path.join('avatars/', filename)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to=avatar_upload_to, null=True, blank=True)

    def compress_avatar(self):
        if self.avatar:
            try:
                img = Image.open(self.avatar)
                max_size = (300, 300)
                img.thumbnail(max_size)
                output = BytesIO()
                img.save(output, format='JPEG', quality=85)
                self.avatar.save(self.avatar.name, InMemoryUploadedFile(
                    output,
                    'ImageField',
                    self.avatar.name,
                    'image/jpeg',
                    output.tell(),
                    None
                ), save=False)
            except IOError as e:
                print(f"Error compressing avatar: {e}")

    def __str__(self):
        return self.user.username


# Signal Handlers

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    try:
        user_profile = instance.userprofile
        user_profile.compress_avatar()
        user_profile.save()
    except UserProfile.DoesNotExist:
        UserProfile.objects.create(user=instance)


@receiver(pre_save, sender=UserProfile)
def delete_old_avatar(sender, instance, **kwargs):
    if not instance.pk:
        return False

    try:
        old_avatar = UserProfile.objects.get(pk=instance.pk).avatar
    except UserProfile.DoesNotExist:
        return False

    new_avatar = instance.avatar
    if not old_avatar == new_avatar:
        if bool(old_avatar):
            old_avatar.storage.delete(old_avatar.name)
