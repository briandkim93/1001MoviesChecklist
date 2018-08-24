from rest_framework.permissions import BasePermission

class UpdateAccountPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action == 'list':
            return request.user.is_staff
        else:
            return True
    def has_object_permission(self, request, view, obj):
        return request.user.id == obj.id or request.user.is_staff
