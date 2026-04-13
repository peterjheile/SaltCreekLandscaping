from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Q
from django.utils.text import slugify
import uuid



class ServicePageContent(models.Model):
    """
    Page-level content/settings for the service page.

    Allows multiple versions (e.g., Seasonal services, Updated services),
    with one marked as active.
    """

    name = models.CharField(
        max_length=120,
        unique=True,
        help_text="Internal/admin name for this version, e.g. 'Spring services'.",
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
        help_text="Main heading for the service section.",
    )
    subtitle = models.TextField(
        blank=True,
        help_text="Supporting text below the title.",
    )
    hero_image = models.ImageField(
        upload_to="services/hero/",
        blank=True,
        null=True,
        help_text="Hero/background image for the services page.",
    )
    is_active = models.BooleanField(
        default=False,
        help_text="Only one service page content entry should usually be active.",
    )
    sort_order = models.PositiveIntegerField(
        default=0,
        help_text="Lower numbers appear first in admin ordering.",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "name"]
        verbose_name = "Service Page Content"
        verbose_name_plural = "Service Page Content"
        constraints = [
            models.UniqueConstraint(
                fields=["is_active"],
                condition=Q(is_active=True),
                name="unique_active_service_page_content",
            )
        ]

    def __str__(self):
        return self.name

    def clean(self):
        super().clean()

        if not self.slug and self.name:
            self.slug = slugify(self.name)

        if self.is_active:
            qs = ServicePageContent.objects.filter(is_active=True)
            if self.pk:
                qs = qs.exclude(pk=self.pk)

            if qs.exists():
                raise ValidationError(
                    {
                        "is_active": "Only one service page content entry can be active at a time."
                    }
                )

    def save(self, *args, **kwargs):
        if not self.slug and self.name:
            self.slug = slugify(self.name)

        self.full_clean()
        super().save(*args, **kwargs)








class ServiceCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    title = models.CharField(max_length=120)
    eyebrow = models.CharField(max_length=80, blank=True)
    slug = models.SlugField(unique=True)

    short_description = models.TextField()
    long_description = models.TextField()

    icon_name = models.CharField(
        max_length=50,
        blank=True,
        help_text="Frontend icon key (e.g. 'scissors', 'wind')",
    )

    sort_order = models.IntegerField(default=0)
    is_published = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    included_items = models.ManyToManyField(
        "ServiceIncludedItem",
        through="ServiceCategoryIncludedItem",
        related_name="service_categories",
        blank=True,
    )

    class Meta:
        ordering = ["sort_order", "title"]
        indexes = [
            models.Index(fields=["sort_order"]),
            models.Index(fields=["is_published"]),
            models.Index(fields=["is_published", "sort_order"]),
        ]
        verbose_name = "Service Page Category"
        verbose_name_plural = "Service Page Categories"

    def __str__(self):
        return self.title


class ServiceIncludedItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=120, unique=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Service Page Item"
        verbose_name_plural = "Service Page Items"

    def __str__(self):
        return self.name








class ServiceCategoryIncludedItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    service_category = models.ForeignKey(
        ServiceCategory,
        on_delete=models.CASCADE,
        related_name="service_category_included_items",
    )
    included_item = models.ForeignKey(
        ServiceIncludedItem,
        on_delete=models.CASCADE,
        related_name="service_category_included_items",
    )

    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "included_item__name"]
        constraints = [
            models.UniqueConstraint(
                fields=["service_category", "included_item"],
                name="unique_included_item_per_service_category",
            )
        ]
        indexes = [
            models.Index(fields=["service_category", "sort_order"]),
            models.Index(fields=["included_item"]),
        ]
        verbose_name = "Service Page Category"
        verbose_name_plural = "Service Page Categories"

    def __str__(self):
        return f"{self.service_category.title} → {self.included_item.name}"