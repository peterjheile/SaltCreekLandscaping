from rest_framework.permissions import AllowAny
from rest_framework import generics
from django.http import Http404

from .serializers import ContactPageContentSerializer
from .models import ContactPageContent


class ActiveContactPageContentView(generics.RetrieveAPIView):
    serializer_class = ContactPageContentSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        obj = ContactPageContent.objects.filter(is_active=True).first()
        if obj is None:
            raise Http404("No active FAQ page content found.")
        return obj