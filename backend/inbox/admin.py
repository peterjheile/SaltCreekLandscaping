from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import *

@admin.register(ContactMessage)
class ContactMessageAdmin(ModelAdmin):
    list_display = ("name", "email", "phone", "subject", "created_at")
    search_fields = ("name", "email", "phone", "subject", "message")
    ordering = ("-created_at",)

    readonly_fields = (
        "name",
        "email",
        "phone",
        "subject",
        "message",
        "created_at",
    )

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
    



@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "phone",
        "display_service_category",
        "created_at",
    )
    search_fields = (
        "name",
        "email",
        "phone",
        "service_category_title",
        "message",
    )
    ordering = ("-created_at",)

    readonly_fields = (
        "id",
        "name",
        "email",
        "phone",
        "service_category",
        "service_category_title",
        "message",
        "created_at",
    )

    @admin.display(description="Service Category")
    def display_service_category(self, obj):
        return obj.service_category_title or "Not specified"

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
