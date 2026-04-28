from django.contrib import admin
from unfold.admin import ModelAdmin
from django.utils.html import format_html

from .models import (
    ServicePageContent,
    ServiceCategory,
    ServiceIncludedItem,
    ServiceCategoryIncludedItem,
)


@admin.register(ServicePageContent)
class ServicePageContentAdmin(ModelAdmin):
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
class ServiceCategoryAdmin(ModelAdmin):
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
            • <strong>mowing</strong> – Mowing / lawn cutting<br>
            • <strong>grass</strong> – Grass / lawn care<br>
            • <strong>tree</strong> – Trees / tree work<br>
            • <strong>rock</strong> – Rock beds / hardscaping<br>
            • <strong>mulch</strong> – Mulch / bed refresh<br>
            • <strong>cleanup</strong> – Yard cleanup<br>
            • <strong>trash</strong> – Debris removal<br>
            • <strong>hauling</strong> – Hauling / transport<br>
            • <strong>watering</strong> – Watering / irrigation<br>
            • <strong>sprinkler</strong> – Sprinklers / water systems<br>
            • <strong>trimming</strong> – Trimming / edging<br>
            • <strong>hedge</strong> – Hedges / shrubs<br>
            • <strong>snow</strong> – Snow removal<br>
            • <strong>sun</strong> – Summer / outdoor care<br>
            • <strong>wind</strong> – Blowing / leaf cleanup<br>
            • <strong>storm</strong> – Storm cleanup<br>
            • <strong>rain</strong> – Rain / drainage<br>
            • <strong>lightning</strong> – Storm damage<br>
            • <strong>home</strong> – Residential service<br>
            • <strong>tools</strong> – Tools / general work<br>
            • <strong>patio</strong> – Patio / hardscape layout<br>
            • <strong>check</strong> – Completed / verified<br>
            • <strong>premium</strong> – Featured / premium service<br>
            • <strong>location</strong> – Location-based service<br>
            • <strong>schedule</strong> – Scheduled service<br>
            • <strong>design</strong> – Landscape design / layout
        """
        return form


@admin.register(ServiceIncludedItem)
class ServiceIncludedItemAdmin(ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)