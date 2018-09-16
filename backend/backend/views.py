from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
 
@api_view(['GET'])
def api_root(request, format=None):
    return Response({
       'email_verify': reverse('email_verify', request=request, format=format),
       'email_verify_confirm': reverse('email_verify_confirm', request=request, format=format),
       'password_reset': reverse('password_reset', request=request, format=format),
       'password_reset_confirm': reverse('password_reset_confirm', request=request, format=format),
       'knox_login': reverse('knox_login', request=request, format=format),
       'knox_logout': reverse('knox_logout', request=request, format=format),
       'social_authorize': reverse('authorize', request=request, format=format),
       'social_convert_token': reverse('convert_token', request=request, format=format),
       'social_revoke_token': reverse('revoke_token', request=request, format=format),
    })