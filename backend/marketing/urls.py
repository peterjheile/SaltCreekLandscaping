from django.urls import path
from .views import HomepageReviewCardListView, ReviewCardListView, FAQCategoryListView
from .views import ActiveReviewsPageContentView, ActiveFAQPageContentView, ActiveContactPageContentView, ActiveServicePageContentView, ActiveGalleryPageContentView
from .views import ServiceCategoryListView
from .views import GalleryPhotoListView, HomepageGalleryPhotoListView
from .views import ActiveHomePageHeroContentView
from .views import AboutModuleListView

urlpatterns = [
    
    path("faq-page-content/",ActiveFAQPageContentView.as_view(),name="faq-page-content-active",),
    path("contact-page-content/",ActiveContactPageContentView.as_view(),name="contact-page-content-active",),
    path("service-page-content/",ActiveServicePageContentView.as_view(),name="service-page-content-active",),
    path("gallery-page-content/",ActiveGalleryPageContentView.as_view(),name="gallery-page-content-active",),
    path("home-page-content/",ActiveHomePageHeroContentView.as_view(),name="home-page-content-active",),
    path("reviews-page-content/",ActiveReviewsPageContentView.as_view(),name="reviews-page-content-active"),

    path("gallery/", GalleryPhotoListView.as_view(), name="gallery-photo-list"),
    path("gallery/homepage/", HomepageGalleryPhotoListView.as_view(), name="homepage-gallery-photo-list"),


    path("faqs/", FAQCategoryListView.as_view(), name="faq-list"),


    path("services/", ServiceCategoryListView.as_view(), name="service-list"),


    path("reviews/", ReviewCardListView.as_view(), name="review-card-list"),
    path("reviews/homepage/", HomepageReviewCardListView.as_view(), name="homepage-review-card-list"),


    path("home-about-modules/",AboutModuleListView.as_view(),name="home-about-modules-active",),
    

]
