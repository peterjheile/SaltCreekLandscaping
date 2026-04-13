from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Q
from django.utils.text import slugify


class FAQPageContent(models.Model):
    """
    Page-level content/settings for the FAQ page.

    Allows multiple versions (e.g., Seasonal FAQs, Updated FAQs),
    with one marked as active.
    """

    name = models.CharField(
        max_length=120,
        unique=True,
        help_text="Internal/admin name for this version, e.g. 'Spring FAQs'.",
    )
    slug = models.SlugField(
        max_length=140,
        unique=True,
        blank=True,
        help_text="Auto-generated from the name if left blank.",
    )

    eyebrow = models.CharField(
        max_length=120,
        blank=True,
        help_text="Small text above the title.",
    )
    title = models.CharField(
        max_length=200,
        help_text="Main heading for the FAQ section.",
    )
    subtitle = models.TextField(
        blank=True,
        help_text="Supporting text below the title.",
    )
    hero_image = models.ImageField(
        upload_to="faqs/hero/",
        blank=True,
        null=True,
        help_text="Hero/background image for the FAQs page.",
    )
    is_active = models.BooleanField(
        default=False,
        help_text="Only one FAQ page content entry should usually be active.",
    )
    sort_order = models.PositiveIntegerField(
        default=0,
        help_text="Lower numbers appear first in admin ordering.",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "name"]
        verbose_name = "FAQ Page Content"
        verbose_name_plural = "FAQ Page Content"
        constraints = [
            models.UniqueConstraint(
                fields=["is_active"],
                condition=Q(is_active=True),
                name="unique_active_faq_page_content",
            )
        ]

    def __str__(self):
        return self.name

    def clean(self):
        super().clean()

        if not self.slug and self.name:
            self.slug = slugify(self.name)

        if self.is_active:
            qs = FAQPageContent.objects.filter(is_active=True)
            if self.pk:
                qs = qs.exclude(pk=self.pk)

            if qs.exists():
                raise ValidationError(
                    {
                        "is_active": "Only one FAQ page content entry can be active at a time."
                    }
                )

    def save(self, *args, **kwargs):
        if not self.slug and self.name:
            self.slug = slugify(self.name)

        self.full_clean()
        super().save(*args, **kwargs)








class FAQCategory(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "FAQ Category"
        verbose_name_plural = "FAQ Categories"

    def __str__(self):
        return self.name
    





class FAQ(models.Model):
    category = models.ForeignKey(
        FAQCategory,
        on_delete=models.CASCADE,
        related_name="faqs"
    )

    question = models.CharField(max_length=500)
    answer = models.TextField()

    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "FAQ Question"
        verbose_name_plural = "FAQ Questions"

    def __str__(self):
        return self.question