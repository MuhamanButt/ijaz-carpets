# home/decorators.py
from functools import wraps
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response

def validate_jwt(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        # Initialize JWT Authentication
        auth = JWTAuthentication()

        # Try to authenticate the request
        try:
            # Authenticate request and get user and token
            user, token = auth.authenticate(request)
            # Set the user on the request
            request.user = user
            request.auth = token
        except AuthenticationFailed as e:
            # If authentication fails, return an error response
            return Response({'status': 401, 'message': str(e)}, status=401)
        
        return view_func(request, *args, **kwargs)
    
    return _wrapped_view