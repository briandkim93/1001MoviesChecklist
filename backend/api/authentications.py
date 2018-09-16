from rest_framework.authentication import BasicAuthentication

class BasicAuthentication403(BasicAuthentication):
    def authenticate_header(self, request):
        return None