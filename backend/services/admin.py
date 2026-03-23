from django.contrib import admin
from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("name", "display_order", "is_active", "updated_at")
    list_editable = ("display_order", "is_active")
    search_fields = ("name", "short_description")
    list_filter = ("is_active",)

    