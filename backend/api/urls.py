from django.urls import include, path

from rest_framework.routers import DefaultRouter

from .views import AccountViewSet, MovieViewSet

router = DefaultRouter()
router.register('account', AccountViewSet)
router.register('movie', MovieViewSet)

urlpatterns = [
    path('', include(router.urls))
]