from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    # Custom permission to only allow owners of an object to update or delete it
    def has_object_permission(self, request, view, obj):
        # Always allow read requests (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True

        # Allow write requests only for owner of snippet
        return obj.owner == request.user