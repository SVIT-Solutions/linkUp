from django.utils import translation

class SetLanguageMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user_language = request.META.get('HTTP_ACCEPT_LANGUAGE', 'en')
        translation.activate(user_language)
        request.LANGUAGE_CODE = translation.get_language()

        response = self.get_response(request)
        
        print(f"Current language code: {request.LANGUAGE_CODE}")

        return response