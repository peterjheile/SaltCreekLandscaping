from django.contrib import admin
from .models import SiteSettings, BusinessHour


class BusinessHourInline(admin.TabularInline):
    model = BusinessHour
    extra = 1
    fields = (
        "label",
        "open_time",
        "close_time",
        "is_closed",
        "sort_order",
    )
    ordering = ("sort_order",)

    verbose_name = "Business Hour"
    verbose_name_plural = "Business Hours"

    def get_formset(self, request, obj=None, **kwargs):
        formset = super().get_formset(request, obj, **kwargs)
        form = formset.form

        form.base_fields["label"].help_text = (
            'Group label, e.g. "Mon - Fri", "Saturday", "Sunday".'
        )
        form.base_fields["open_time"].help_text = (
            "Opening time (leave blank if closed)."
        )
        form.base_fields["close_time"].help_text = (
            "Closing time (leave blank if closed)."
        )
        form.base_fields["is_closed"].help_text = (
            "Check if the business is closed for this row."
        )
        form.base_fields["sort_order"].help_text = (
            "Controls display order (lower numbers appear first)."
        )

        return formset


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    inlines = [BusinessHourInline]

    fieldsets = (
        ("Business Info", {
            "description": "Basic branding information for your business.",
            "fields": (
                "business_name",
                "tagline",
                "logo",
            )
        }),
        ("Contact Info", {
            "description": "Primary ways customers can contact you.",
            "fields": (
                "phone",
                "email",
            )
        }),
        ("Address", {
            "description": "Physical location and service coverage.",
            "fields": (
                "address",
                "city",
                "state",
                "zip_code",
                "service_area",
            )
        }),
        ("Social Links", {
            "description": "Links to your social and business profiles.",
            "fields": (
                "facebook_url",
                "instagram_url",
                "google_business_url",
            )
        }),
        ("Theme Colors", {
            "description": "Controls the entire website color scheme.",
            "fields": (
                "primary_color",
                "secondary_color",
                "highlight_color",
                "text_color",
                "text_inverse_color",
            )
        }),
        ("Metadata", {
            "description": "Automatically managed timestamps.",
            "fields": (
                "created_at",
                "updated_at",
            )
        }),
    )

    readonly_fields = ("created_at", "updated_at")

    def has_add_permission(self, request):
        # Only allow one SiteSettings instance
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        # Prevent deletion of the singleton
        return False


@admin.register(BusinessHour)
class BusinessHourAdmin(admin.ModelAdmin):
    list_display = (
        "label",
        "open_time",
        "close_time",
        "is_closed",
        "sort_order",
        "site_settings",
    )
    list_editable = (
        "open_time",
        "close_time",
        "is_closed",
        "sort_order",
    )
    ordering = ("site_settings", "sort_order", "id")
    search_fields = ("label",)
    list_filter = ("is_closed",)

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)

        form.base_fields["label"].help_text = (
            'Group label, e.g. "Mon - Fri", "Saturday", "Sunday".'
        )
        form.base_fields["open_time"].help_text = (
            "Opening time (leave blank if closed)."
        )
        form.base_fields["close_time"].help_text = (
            "Closing time (leave blank if closed)."
        )
        form.base_fields["is_closed"].help_text = (
            "Check if the business is closed for this row."
        )
        form.base_fields["sort_order"].help_text = (
            "Controls display order (lower numbers appear first)."
        )

        return form