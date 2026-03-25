# marketing/views.py

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from .models import HeroCard, FeatureCard, ReviewCard, HeroContent
from .serializers import HeroCardSerializer, FeatureCardSerializer, ReviewCardSerializer, HeroContentSerializer


@api_view(["GET"])
def hero_cards(request):
    cards = (
        HeroCard.objects
        .filter(is_active=True)
        .order_by("sort_order")[:15]
    )

    serializer = HeroCardSerializer(cards, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(["GET"])
def feature_cards(request):
    cards = (
        FeatureCard.objects
        .filter(is_active=True)
        .order_by("sort_order", "id")[:4]
    )

    serializer = FeatureCardSerializer(
        cards,
        many=True,
        context={"request": request}
    )

    return Response(serializer.data)



class ReviewCardListView(generics.ListAPIView):
    serializer_class = ReviewCardSerializer

    def get_queryset(self):
        return ReviewCard.objects.filter(is_active=True).order_by("sort_order", "id")
    

class HeroContentView(generics.RetrieveAPIView):
    serializer_class = HeroContentSerializer

    def get_object(self):
        return HeroContent.objects.get(is_active=True)