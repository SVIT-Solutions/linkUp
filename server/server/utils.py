from django.utils.crypto import get_random_string
from django.db import IntegrityError

def generate_unique_token(model_class):
    unique = False
    while not unique:
            token = get_random_string(length=32)
            if not model_class.objects.filter(password_change_token=token).exists():
                unique = True
    return token
