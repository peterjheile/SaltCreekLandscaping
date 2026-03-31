from django.contrib import admin

from .models import (
    ServiceCategory,
    ServiceIncludedItem,
    ServiceCategoryIncludedItem,
)


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


@admin.register(ServiceIncludedItem)
class ServiceIncludedItemAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)

