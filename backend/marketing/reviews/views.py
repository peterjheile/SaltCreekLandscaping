
from rest_framework.permissions import AllowAny
from rest_framework import generics
from django.http import Http404

from .models import ReviewCard, ReviewsPageContent
from .serializers import ReviewCardSerializer, ReviewsPageContentSerializer




class ActiveReviewsPageContentView(generics.RetrieveAPIView):
    serializer_class = ReviewsPageContentSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        obj = ReviewsPageContent.objects.filter(is_active=True).first()
        if obj is None:
            raise Http404("No active reviews page content found.")
        return obj
    


class ReviewCardListView(generics.ListAPIView):
    serializer_class = ReviewCardSerializer

    def get_queryset(self):
        return ReviewCard.objects.filter(is_active=True)
    



class HomepageReviewCardListView(generics.ListAPIView):
    serializer_class = ReviewCardSerializer

    def get_queryset(self):
        return ReviewCard.objects.filter(
            is_active=True,
            show_on_homepage=True,
        )