from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import AccountViewSet, LoginViewSet

router = DefaultRouter()
router.register('account', AccountViewSet)
router.register('login', LoginViewSet, base_name='login')

urlpatterns = [
    path('', include(router.urls))
]