from django.conf import settings
from django.core.mail import EmailMessage
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.permissions import AllowAny

from django.views.decorators.csrf import ensure_csrf_cookie

from .models import *
from .serializers import *
from core.models import SiteSettings




class ContactMessageThrottle(AnonRateThrottle):
    scope = "contact_message"


class QuoteRequestThrottle(AnonRateThrottle):
    scope = "quote_request"


class ContactMessageCreateView(CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    throttle_classes = [ContactMessageThrottle]
    permission_classes = [AllowAny]
    authentication_classes = []



    def create(self, request, *args, **kwargs):
        if request.data.get("hp"):
            return Response(
                {"detail": "Message sent successfully."},
                status=status.HTTP_201_CREATED,
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        contact_message = serializer.save()

        print(request.META.get("REMOTE_ADDR"))

        try:
            site_settings = SiteSettings.objects.get(pk=1)
            recipient_email = site_settings.email or settings.DEFAULT_FROM_EMAIL
            business_name = site_settings.business_name or "Website"
        except SiteSettings.DoesNotExist:
            recipient_email = settings.DEFAULT_FROM_EMAIL
            business_name = "Website"

        subject = f"[{business_name} General Contact] Subject: {contact_message.subject}"
        body = (
            f"New contact form submission\n\n"
            f"Name: {contact_message.name}\n"
            f"Email: {contact_message.email}\n"
            f"Phone: {contact_message.phone or 'Not provided'}\n"
            f"Subject: {contact_message.subject}\n\n"
            f"Message:\n{contact_message.message}\n"
        )

        email = EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[recipient_email],
            reply_to=[contact_message.email],
        )
        email.send(fail_silently=False)

        return Response(
            {"detail": "Message sent successfully."},
            status=status.HTTP_201_CREATED,
        )
    



class QuoteRequestCreateView(CreateAPIView):
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestSerializer
    throttle_classes = [QuoteRequestThrottle]
    permission_classes = [AllowAny]
    authentication_classes = []

    def create(self, request, *args, **kwargs):
        # Honeypot: pretend success, but do nothing
        if request.data.get("hp"):
            return Response(
                {"detail": "Quote request sent successfully."},
                status=status.HTTP_201_CREATED,
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        quote_request = serializer.save()

        try:
            site_settings = SiteSettings.objects.get(pk=1)
            recipient_email = site_settings.email or settings.DEFAULT_FROM_EMAIL
            business_name = site_settings.business_name or "Website"
        except SiteSettings.DoesNotExist:
            recipient_email = settings.DEFAULT_FROM_EMAIL
            business_name = "Website"

        selected_category = (
            quote_request.service_category_title
            or (
                quote_request.service_category.title
                if quote_request.service_category
                else "Not specified"
            )
        )

        subject = f"[{business_name} Quote Request] {selected_category} Request"

        body = (
            f"New quote request submission\n\n"
            f"Name: {quote_request.name}\n"
            f"Email: {quote_request.email}\n"
            f"Phone: {quote_request.phone or 'Not provided'}\n"
            f"Service Category: {selected_category}\n\n"
            f"Message:\n{quote_request.message}\n"
        )

        email = EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[recipient_email],
            reply_to=[quote_request.email],
        )
        email.send(fail_silently=False)

        return Response(
            {"detail": "Quote request sent successfully."},
            status=status.HTTP_201_CREATED,
        )