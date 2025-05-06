from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, ModeratorViewSet, get_csrf_token

router = DefaultRouter()
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('csrf/', get_csrf_token, name='csrf'),
]

