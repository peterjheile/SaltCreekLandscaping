from django.db import models


class Service(models.Model):
    name = models.CharField(max_length=120)
    short_description = models.CharField(max_length=300)
    image = models.ImageField(upload_to="services/", blank=True, null=True)

    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "id"]
        verbose_name = "Service"
        verbose_name_plural = "Services"

    short_description = models.CharField(
        max_length=300,
        help_text="Keep this short and punchy for the website service card."
    )

    def __str__(self):
        return self.name