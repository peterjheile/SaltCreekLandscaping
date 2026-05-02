from django.contrib import admin
from unfold.admin import ModelAdmin
from django.utils.html import format_html
from django.utils.safestring import mark_safe

from .models import HomePageHeroContent, AboutModule


@admin.register(HomePageHeroContent)
class HomePageHeroContentAdmin(ModelAdmin):
    list_display = (
        "name",
        "is_active",
        "sort_order",
        "title",
        "has_image",
        "has_video",
        "updated_at",
    )
    list_display_links = ("name", "title")
    list_editable = ("sort_order",)
    search_fields = ("name", "slug", "eyebrow", "title", "subtitle")
    list_filter = ("is_active",)
    ordering = ("sort_order", "name")
    readonly_fields = (
        "slug",
        "created_at",
        "updated_at",
        "image_preview",
        "video_preview",
    )

    fieldsets = (
        (
            "Versioning",
            {
                "fields": (
                    "name",
                    "slug",
                    "is_active",
                    "sort_order",
                )
            },
        ),
        (
            "Hero Content",
            {
                "fields": (
                    "eyebrow",
                    "title",
                    "subtitle",
                )
            },
        ),
        (
            "What You Can Expect",
            {
                "fields": (
                    "expect_item_1",
                    "expect_item_2",
                    "expect_item_3",
                ),
                "description": "These appear as the three expectation items in the homepage hero.",
            },
        ),
        (
            "Media",
            {            
                "description": mark_safe(
                """
                <p>Hero image displayed at the top of the homepage.</p>

                <p><strong>Hero image guidelines:</strong></p>
                <ul>
                    <li>• Use a wide, landscape image. Recommended aspect ratio: <strong>16:9 or wider</strong>.</li>
                    <li>• Upload a high-quality image, ideally at least <strong>1920px wide</strong>.</li>
                    <li>• Keep the main subject near the <strong>center</strong> of the image.</li>
                    <li>• The image will be <strong>cropped differently on mobile and desktop</strong> screens.</li>
                    <li>• Avoid placing important text or logos inside the image.</li>
                </ul>
                """
            ),
                "fields": (
                    "hero_image",
                    "image_preview",
                    "hero_video",
                    "video_preview",
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

    def has_image(self, obj):
        return bool(obj.hero_image)

    has_image.boolean = True
    has_image.short_description = "Image"

    def has_video(self, obj):
        return bool(obj.hero_video)

    has_video.boolean = True
    has_video.short_description = "Video"

    def image_preview(self, obj):
        if not obj.hero_image:
            return "No image uploaded."

        return format_html(
            '<img src="{}" style="max-width: 320px; width: 100%; border-radius: 12px;" />',
            obj.hero_image.url,
        )

    image_preview.short_description = "Image Preview"

    def video_preview(self, obj):
        if not obj.hero_video:
            return "No video uploaded."

        return format_html(
            '<video src="{}" style="max-width: 320px; width: 100%; border-radius: 12px;" controls preload="metadata"></video>',
            obj.hero_video.url,
        )

    video_preview.short_description = "Video Preview"








@admin.register(AboutModule)
class AboutModuleAdmin(ModelAdmin):
    list_display = (
        "title",
        "sort_order",
        "is_active",
        "updated_at",
    )
    list_editable = ("sort_order",)
    search_fields = ("title", "description", "cta_text", "cta_link")
    ordering = ("sort_order", "id")
    readonly_fields = ("created_at", "updated_at")

    fieldsets = (
        (
            "Content",
            {
                "fields": (
                    "title",
                    "description",
                ),
                "description": "Main text content for this section of the homepage About area.",
            },
        ),
        (
            "Image",
            {
                "fields": (
                    "image",
                    "image_alt",
                ),
                "description": mark_safe(
                    """
                    <p>Upload an image and provide alt text for accessibility and SEO.</p>

                    <p><strong>Image guidelines:</strong></p>
                    <ul>
                        <li>• Images with a <strong>4:3 aspect ratio</strong> tend to display best in this section.</li>
                        <li>• Other ratios will still work, but may be <strong>cropped to fit</strong> different screen sizes.</li>
                        <li>• Keep the main subject <strong>centered</strong> in the image.</li>
                        <li>• Avoid placing important content near the edges.</li>
                    </ul>
                    """)
            },
        ),
        (
            "Call to Action",
            {
                "fields": (
                    "cta_text",
                    "cta_link",
                ),
                "description": "Optional button. Add text and a link if you want users to take action (e.g., book a service).",
            },
        ),
        (
            "Display Settings",
            {
                "fields": (
                    "is_active",
                    "sort_order",
                ),
                "description": "Control whether this module is shown and where it appears. Lower sort order values appear first.",
            },
        ),
        (
            "Timestamps",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                ),
                "description": "Automatically managed timestamps for when this module was created and last updated.",
            },
        ),
    )