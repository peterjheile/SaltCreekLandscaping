from .faqs.admin import *
from .contact.admin import *
from .services.admin import *
from .gallery.admin import *
from .home.admin import *
from .reviews.admin import *




from django.contrib import admin, messages
from .models import HeroCard, FeatureCard, ReviewCard, HeroContent
from django.db.models import Max
from django.utils.html import format_html
from .models import ReviewsPageContent


@admin.register(HeroCard)
class HeroCardAdmin(admin.ModelAdmin):
    list_display = ("title", "sort_order", "is_active")
    list_editable = ("sort_order", "is_active")
    ordering = ("sort_order",)


@admin.register(FeatureCard)
class FeatureCardAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active", "sort_order", "created_at")
    list_editable = ("is_active", "sort_order")
    ordering = ("sort_order", "id")
    search_fields = ("title",)

    fieldsets = (
        ("Content", {
            "fields": ("title", "description", "image"),
        }),
        ("Call To Action (Optional)", {
            "fields": ("cta_text", "cta_link"),
            "description": "Leave both fields blank to hide the button.",
        }),
        ("Display Settings", {
            "fields": ("is_active", "sort_order"),
            "description": "You can have at most 4 active feature cards.",
        }),
    )

    def changelist_view(self, request, extra_context=None):
        active_count = FeatureCard.objects.filter(is_active=True).count()

        if active_count < 4:
            self.message_user(
                request,
                f"You currently have {active_count}/4 active feature cards.",
                level=messages.WARNING,
            )
        elif active_count == 4:
            self.message_user(
                request,
                "You currently have 4/4 active feature cards.",
                level=messages.INFO,
            )

        return super().changelist_view(request, extra_context=extra_context)

    def save_model(self, request, obj, form, change):
        if obj.sort_order in (None, 0):
            max_order = FeatureCard.objects.exclude(pk=obj.pk).aggregate(
                max_order=Max("sort_order")
            )["max_order"]
            obj.sort_order = (max_order or 0) + 1

        super().save_model(request, obj, form, change)



from django.contrib import admin
from django.utils.html import format_html










@admin.register(HeroContent)
class HeroContentAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active", "created_at")
    list_editable = ("is_active",)
    list_filter = ("is_active", "created_at")
    search_fields = ("title", "subtitle")
    ordering = ("-is_active", "-created_at")
    readonly_fields = ("created_at",)
    fields = ("title", "subtitle", "is_active", "created_at")









#Everything to do with FAQs






########## SERVICES HERO (Marketing) ##########
@admin.register(ReviewsPageContent)
class ReviewsPageContentAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "title",
        "is_active",
        "sort_order",
        "hero_image_preview",
        "updated_at",
    )
    list_filter = ("is_active", "created_at", "updated_at")
    search_fields = ("name", "slug", "title", "eyebrow", "subtitle")
    ordering = ("sort_order", "name")
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields = ("hero_image_preview", "created_at", "updated_at")

    fieldsets = (
        (
            "Admin Info",
            {
                "fields": ("name", "slug", "is_active", "sort_order"),
            },
        ),
        (
            "Hero Content",
            {
                "fields": (
                    "eyebrow",
                    "title",
                    "subtitle",
                    "hero_image",
                    "hero_image_preview",
                ),
            },
        ),
        (
            "Timestamps",
            {
                "fields": ("created_at", "updated_at"),
            },
        ),
    )

    def hero_image_preview(self, obj):
        if obj.hero_image:
            return format_html(
                '<img src="{}" style="max-height: 120px; border-radius: 8px;" />',
                obj.hero_image.url,
            )
        return "No image"

    hero_image_preview.short_description = "Hero Image Preview"