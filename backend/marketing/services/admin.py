from django.contrib import admin
from django.utils.html import format_html

from .models import (
    ServicePageContent,
    ServiceCategory,
    ServiceIncludedItem,
    ServiceCategoryIncludedItem,
)


@admin.register(ServicePageContent)
class ServicePageContentAdmin(admin.ModelAdmin):
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
            "FAQ Content",
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


class ServiceCategoryIncludedItemInline(admin.TabularInline):
    model = ServiceCategoryIncludedItem
    extra = 1
    autocomplete_fields = ("included_item",)
    fields = ("included_item", "sort_order")
    ordering = ("sort_order",)


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "eyebrow",
        "slug",
        "icon_name",
        "sort_order",
        "is_published",
        "updated_at",
    )
    list_filter = ("is_published",)
    search_fields = ("title", "eyebrow", "short_description", "long_description")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("sort_order", "title")
    readonly_fields = ("created_at", "updated_at")
    inlines = [ServiceCategoryIncludedItemInline]

    fieldsets = (
        (
            "Display Content",
            {
                "fields": (
                    "title",
                    "eyebrow",
                    "slug",
                    "short_description",
                    "long_description",
                    "icon_name",
                )
            },
        ),
        (
            "Publishing",
            {
                "fields": (
                    "sort_order",
                    "is_published",
                )
            },
        ),
        (
            "Timestamps",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields["icon_name"].help_text = """
            Available icons:<br><br>
            • <strong>scissors</strong> – Cutting / trimming<br>
            • <strong>wind</strong> – Blowing / cleanup<br>
            • <strong>droplet</strong> – Irrigation / water<br>
            • <strong>layers</strong> – Mulch / layering<br>
            • <strong>home</strong> – Residential<br>
            • <strong>trash</strong> – Junk / debris removal<br>
            • <strong>tool</strong> – General service<br>
            • <strong>sun</strong> – Outdoor / summer<br>
            • <strong>cloud</strong> – General weather<br>
            • <strong>rain</strong> – Rain / drainage<br>
            • <strong>activity</strong> – Maintenance<br>
            • <strong>check</strong> – Completed / verified<br>
            • <strong>award</strong> – Premium service<br>
            • <strong>thumbs</strong> – Recommended<br>
            • <strong>star</strong> – Featured<br>
            • <strong>location</strong> – Location-based<br>
            • <strong>navigation</strong> – Service area<br>
            • <strong>settings</strong> – Custom work
        """
        return form


@admin.register(ServiceIncludedItem)
class ServiceIncludedItemAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)