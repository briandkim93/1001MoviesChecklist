from rest_framework.permissions import BasePermission, SAFE_METHODS

class AccountListPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action == 'list':
            return request.user.is_staff
        else:
            return True

class AccountPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'DELETE':
            return False
        else:
            return True
    def has_object_permission(self, request, view, obj):
        return request.user.id == obj.id

class MoviesPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        if request.user.is_staff:
            return True

class SendVerificationEmailPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.id == obj.id