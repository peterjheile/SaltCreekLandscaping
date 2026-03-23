from django.urls import path
from .views import (
    SiteSettingsDetailView,
    HomePageDetailView,
    AboutSectionListView,
)

urlpatterns = [
    path("site-settings/", SiteSettingsDetailView.as_view(), name="site-settings-detail"),
    path("homepage/", HomePageDetailView.as_view(), name="homepage-detail"),
    path("about-sections/", AboutSectionListView.as_view(), name="about-section-list"),
]