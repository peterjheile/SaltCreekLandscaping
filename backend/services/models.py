import uuid
from django.db import models


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

    def __str__(self):
        return self.title


class ServiceIncludedItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=120, unique=True)

    class Meta:
        ordering = ["name"]

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

    def __str__(self):
        return f"{self.service_category.title} → {self.included_item.name}"