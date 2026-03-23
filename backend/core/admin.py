from django.contrib import admin
from .models import SiteSettings, HomePage, AboutSection


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("business_name", "phone", "email", "updated_at")

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()


@admin.register(HomePage)
class HomePageAdmin(admin.ModelAdmin):
    list_display = ("hero_title", "updated_at")

    def has_add_permission(self, request):
        return not HomePage.objects.exists()


@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    list_display = ("heading", "display_order", "is_active", "updated_at")
    list_editable = ("display_order", "is_active")
