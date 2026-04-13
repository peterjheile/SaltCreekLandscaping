from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import NotFound

from .models import SiteSettings
from .serializers import SiteSettingsSerializer


class SiteSettingsView(generics.RetrieveAPIView):
    serializer_class = SiteSettingsSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        obj = SiteSettings.objects.prefetch_related("business_hours").filter(pk=1).first()
        if not obj:
            raise NotFound("Site settings have not been created yet.")
        return obj