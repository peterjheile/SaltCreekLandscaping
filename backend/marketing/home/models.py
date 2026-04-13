from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Q
from django.utils.text import slugify


class HomePageHeroContent(models.Model):
    """
    Page-level hero content/settings for the Homepage hero section.

    Supports multiple versions, with one marked as active.
    """

    name = models.CharField(
        max_length=120,
        unique=True,
        help_text="Internal/admin name, e.g. 'Default Homepage Hero'.",
    )
    slug = models.SlugField(
        max_length=140,
        unique=True,
        blank=True,
        help_text="Auto-generated from the name if left blank.",
    )

    # ── Hero Text ──
    eyebrow = models.CharField(
        max_length=120,
        blank=True,
        help_text="Small text above the title.",
    )
    title = models.CharField(
        max_length=200,
        help_text="Main hero heading.",
    )
    subtitle = models.TextField(
        blank=True,
        help_text="Supporting text under the title.",
    )

    # ── What You Can Expect (fixed 3 items) ──
    expect_item_1 = models.CharField(
        max_length=160,
        blank=True,
        help_text="First 'What you can expect' item.",
    )
    expect_item_2 = models.CharField(
        max_length=160,
        blank=True,
        help_text="Second 'What you can expect' item.",
    )
    expect_item_3 = models.CharField(
        max_length=160,
        blank=True,
        help_text="Third 'What you can expect' item.",
    )

    # ── Media ──
    hero_video = models.FileField(
        upload_to="home/hero/videos/",
        blank=True,
        null=True,
        help_text="Optional hero video. If empty, frontend will fallback to images or hide media section.",
    )

    # ── State / Control ──
    is_active = models.BooleanField(
        default=False,
        help_text="Only one homepage hero content entry should be active.",
    )
    sort_order = models.PositiveIntegerField(
        default=0,
        help_text="Lower numbers appear first in admin ordering.",
    )

    # ── Timestamps ──
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "name"]
        verbose_name = "Homepage Hero Content"
        verbose_name_plural = "Homepage Hero Content"
        constraints = [
            models.UniqueConstraint(
                fields=["is_active"],
                condition=Q(is_active=True),
                name="unique_active_homepage_hero_content",
            )
        ]

    def __str__(self):
        return self.name

    def clean(self):
        super().clean()

        # Auto slug
        if not self.slug and self.name:
            self.slug = slugify(self.name)

        # Ensure only one active
        if self.is_active:
            qs = HomePageHeroContent.objects.filter(is_active=True)
            if self.pk:
                qs = qs.exclude(pk=self.pk)

            if qs.exists():
                raise ValidationError(
                    {
                        "is_active": "Only one homepage hero content entry can be active at a time."
                    }
                )

    def save(self, *args, **kwargs):
        if not self.slug and self.name:
            self.slug = slugify(self.name)

        self.full_clean()
        super().save(*args, **kwargs)




class AboutModule(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()

    image = models.ImageField(
        upload_to="marketing/about_modules/",
        blank=True,
        null=True,
    )
    image_alt = models.CharField(max_length=255, blank=True)

    cta_text = models.CharField(max_length=100, blank=True)
    cta_link = models.CharField(max_length=255, blank=True)

    sort_order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Homepage About Module"
        verbose_name_plural = "Homepage About Modules"
        ordering = ["sort_order", "id"]

    def __str__(self):
        return self.title