from server.celery import app
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from server.utils import generate_unique_token
from .models import User


@app.task
def send_activation_email(user_id):
        user = User.objects.get(pk=user_id)
        token = generate_unique_token(User)
        user.verification_token = token
        user.save()
    
        subject = 'Account Activation Confirmation for Your LinkUp Registration'
        message = render_to_string('email_templates/registration_email.txt', {
            'user': user,
            'confirmation_link': f'{settings.CLIENT_URL}/confirm-email?token={token}',
            'support_email': settings.SUPPORT_EMAIL,
        })
        recipient_list = [user.email]

        send_mail(subject, message, None, recipient_list)

@app.task
def send_password_reset_email(user_id):
    user = User.objects.get(pk=user_id)
    token = generate_unique_token(User)
    user.password_change_token = token
    user.save()

    subject = 'Password Reset Request for Your LinkUp Account'
    message = render_to_string('email_templates/reset_password.txt', {
        'user': user,
        'password_reset_link': f'{settings.CLIENT_URL}/password-reset?token={token}',
        'support_email': settings.SUPPORT_EMAIL,
    })
    recipient_list = [user.email]

    send_mail(subject, message, None, recipient_list)