from django.urls import path
from .views import ContactMessageCreateView, QuoteRequestCreateView

urlpatterns = [
    path("contact-messages/", ContactMessageCreateView.as_view(), name="contact-message-create"),
    path("quote-requests/", QuoteRequestCreateView.as_view(), name="quote-request-create"),
]