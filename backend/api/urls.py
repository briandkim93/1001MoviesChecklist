from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import AccountViewSet, LoginViewSet, MovieViewSet

router = DefaultRouter()
router.register('account', AccountViewSet)
router.register('login', LoginViewSet, base_name='login')
router.register('movie', MovieViewSet)

urlpatterns = [
    path('', include(router.urls))
]