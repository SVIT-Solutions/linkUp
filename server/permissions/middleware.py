import os
from django.http import HttpResponseForbidden

from permissions.models import AccessPermissionDomain

class AllowedDomainMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        addr = request.META.get('HTTP_REMOTE_ADDR', request.META.get('REMOTE_ADDR'))
        host = request.META.get('HTTP_HOST')

        if host == str(os.environ.get("SERVER_HOST", 'localhost:8000')):
            return self.get_response(request)

        if not AccessPermissionDomain.objects.filter(domain__in=[addr, host]).exists():
            return HttpResponseForbidden("Access Forbidden")

        response = self.get_response(request)
        return response
