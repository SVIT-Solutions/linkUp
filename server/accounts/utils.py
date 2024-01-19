from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.template.loader import render_to_string
from decouple import config

def send_activation_email(user):
    token = get_random_string(length=32)
    user.verification_token = token
    user.save()

    subject = 'Registration Confirmation'
    message = render_to_string('email_templates/registration_email.txt', {
        'user': user,
        'confirmation_link': f'{config("CLIENT_URL")}/confirm-email?token={token}',
        'support_email': config("SUPPORT_EMAIL"),
    })
    from_email = 'dmitrylukienko.business@gmail.com'
    recipient_list = [user.email]

    send_mail(subject, message, from_email, recipient_list)
