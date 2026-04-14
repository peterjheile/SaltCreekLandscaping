from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Q
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator




class ReviewsPageContent(models.Model):
    """
    Page-level content/settings for the Reviews page.

    This is separate from the individual review cards themselves.
    The admin can create multiple versions of the page content
    (for example: Winter Edition, Spring Edition, Holiday Edition),
    and mark one as active.
    """

    name = models.CharField(
        max_length=120,
        unique=True,
        help_text="Internal/admin name for this version, e.g. 'Winter Edition'.",
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
        help_text="Main heading for the Reviews page hero section.",
    )
    subtitle = models.TextField(
        blank=True,
        help_text="Supporting text below the title.",
    )

    hero_image = models.ImageField(
        upload_to="reviews/hero/",
        blank=True,
        null=True,
        help_text="Hero/background image for the Reviews page.",
    )

    is_active = models.BooleanField(
        default=False,
        help_text="Only one Reviews page content entry should usually be active.",
    )
    sort_order = models.PositiveIntegerField(
        default=0,
        help_text="Lower numbers appear first in the admin/query ordering.",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "name"]
        verbose_name = "Reviews Page Content"
        verbose_name_plural = "Reviews Page Content"
        constraints = [
            models.UniqueConstraint(
                fields=["is_active"],
                condition=Q(is_active=True),
                name="unique_active_reviews_page_content",
            )
        ]

    def __str__(self):
        return self.name

    def clean(self):
        super().clean()

        if not self.slug and self.name:
            self.slug = slugify(self.name)

        if self.is_active:
            qs = ReviewsPageContent.objects.filter(is_active=True)
            if self.pk:
                qs = qs.exclude(pk=self.pk)

            if qs.exists():
                raise ValidationError(
                    {"is_active": "Only one Reviews page content entry can be active at a time."}
                )

    def save(self, *args, **kwargs):
        if not self.slug and self.name:
            self.slug = slugify(self.name)

        self.full_clean()
        super().save(*args, **kwargs)







class ReviewCard(models.Model):
    name = models.CharField(max_length=255)
    review = models.TextField()

    profile_image = models.ImageField(
        upload_to="review_cards/",
        blank=True,
        null=True,
    )

    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        default=5,
    )

    review_date = models.DateField(null=True, blank=True)

    show_on_homepage = models.BooleanField(
        default=False,
        help_text="If enabled, this review can be displayed on the homepage.",
    )

    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Review Card"
        verbose_name_plural = "Review Cards"
        ordering = ["sort_order", "id"]


    def save(self, *args, **kwargs):
        if not self.is_active:
            self.show_on_homepage = False
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    
