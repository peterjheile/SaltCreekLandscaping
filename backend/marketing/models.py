from .faqs.models import *
from .contact.models import *
from .services.models import *
from .gallery.models import *
from .home.models import *
from .reviews.models import *



from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Q
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify






class HeroCard(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="hero_cards/")

    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return self.title

    def clean(self):
        super().clean()

        if not self.is_active:
            return

        active_count = HeroCard.objects.filter(is_active=True).exclude(pk=self.pk).count()
        if active_count >= 15:
            raise ValidationError({
                "is_active": "You can only have 15 active hero cards."
            })
        


class FeatureCard(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="feature_cards/")

    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    cta_text = models.CharField(max_length=100, blank=True)
    cta_link = models.CharField(max_length=255, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def clean(self):
        errors = {}

        has_cta_text = bool(self.cta_text.strip()) if self.cta_text else False
        has_cta_link = bool(self.cta_link.strip()) if self.cta_link else False

        if has_cta_text != has_cta_link:
            errors["cta_text"] = "cta_text and cta_link must both be filled in or both left blank."
            errors["cta_link"] = "cta_text and cta_link must both be filled in or both left blank."

        if self.is_active:
            active_count = (
                FeatureCard.objects.filter(is_active=True)
                .exclude(pk=self.pk)
                .count()
            )
            if active_count >= 4:
                errors["is_active"] = "You can only have 4 active feature cards."

        if errors:
            raise ValidationError(errors)

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
    






class HeroContent(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.TextField(blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Hero Content"
        verbose_name_plural = "Hero Content"

    def __str__(self):
        status = "Active" if self.is_active else "Inactive"
        return f"{self.title} ({status})"

    def clean(self):
        super().clean()

        if not self.is_active:
            return

        active_count = (
            HeroContent.objects.filter(is_active=True)
            .exclude(pk=self.pk)
            .count()
        )

        if active_count >= 1:
            raise ValidationError({
                "is_active": "Only one Hero Content instance can be active at a time."
            })

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)






    



