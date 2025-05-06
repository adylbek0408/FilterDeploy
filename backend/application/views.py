from rest_framework import viewsets
from .models import Order, Moderator
from .serializers import OrderSerializer, ModeratorSerializer
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_GET


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        import logging
        logger = logging.getLogger(__name__)
        logger.info(f"Receiving order data: {request.data}")

        return super().create(request, *args, **kwargs)


class ModeratorViewSet(viewsets.ModelViewSet):
    queryset = Moderator.objects.all()
    serializer_class = ModeratorSerializer


@require_GET
def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})
