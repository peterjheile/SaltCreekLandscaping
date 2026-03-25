from django.urls import path
from .views import hero_cards, feature_cards, ReviewCardListView, HeroContentView

urlpatterns = [
    path("hero-cards/", hero_cards, name="hero-cards"),
    path("feature-cards/", feature_cards),
    path("review-cards/", ReviewCardListView.as_view(), name="review-card-list"),
    path("hero-content/", HeroContentView.as_view(), name="hero-content"),
]