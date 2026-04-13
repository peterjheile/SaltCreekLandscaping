from django.contrib import admin

from .models import ReviewCard

@admin.register(ReviewCard)
class ReviewCardAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "rating",
        "show_on_homepage",
        "is_active",
        "sort_order",
        "created_at",
    )
    list_editable = (
        "show_on_homepage",
        "is_active",
        "sort_order",
    )
    list_filter = (
        "show_on_homepage",
        "is_active",
        "rating",
    )
    search_fields = ("name", "review")
    ordering = ("sort_order", "id")
    readonly_fields = ("created_at",)

    fieldsets = (
        (
            "Review Content",
            {
                "fields": (
                    "name",
                    "review",
                    "rating",
                ),
                "description": "Main review information shown to users.",
            },
        ),
        (
            "Profile Image",
            {
                "fields": ("profile_image",),
                "description": "Optional reviewer image.",
            },
        ),
        (
            "Display Settings",
            {
                "fields": (
                    "show_on_homepage",
                    "is_active",
                    "sort_order",
                ),
                "description": "Control whether this review is active and whether it should also appear on the homepage.",
            },
        ),
        (
            "Timestamps",
            {
                "fields": ("created_at",),
                "description": "Automatically managed creation timestamp.",
            },
        ),
    )