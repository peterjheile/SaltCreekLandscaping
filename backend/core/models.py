from django.core.validators import RegexValidator
from django.db import models


hex_color_validator = RegexValidator(
    regex=r"^#(?:[0-9A-Fa-f]{6})$",
    message="Enter a valid hex color in the format #RRGGBB.",
)


class SiteSettings(models.Model):
    business_name = models.CharField(max_length=255)
    tagline = models.CharField(max_length=255, blank=True)
    logo = models.ImageField(
        upload_to="site/",
        blank=True,
        null=True,
        help_text="Main website logo used in the navbar and branding.",
    )

    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)

    address = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    zip_code = models.CharField(max_length=20, blank=True)

    service_area = models.CharField(
        max_length=255,
        blank=True,
        help_text="Example: Bloomington, IN and surrounding areas",
    )

    facebook_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    google_business_url = models.URLField(blank=True)

    primary_color = models.CharField(
        max_length=7,
        default="#013220",
        validators=[hex_color_validator],
        help_text="Main brand color in hex format, e.g. #013220",
    )
    secondary_color = models.CharField(
        max_length=7,
        default="#ada18c",
        validators=[hex_color_validator],
        help_text="Secondary brand color in hex format, e.g. #ada18c",
    )
    highlight_color = models.CharField(
        max_length=7,
        default="#c49c48",
        validators=[hex_color_validator],
        help_text="Highlight color in hex format, e.g. #c49c48",
    )
    text_color = models.CharField(
        max_length=7,
        default="#000000",
        validators=[hex_color_validator],
        help_text="Default text color in hex format, e.g. #000000",
    )
    text_inverse_color = models.CharField(
        max_length=7,
        default="#ffffff",
        validators=[hex_color_validator],
        help_text="Inverse text color in hex format, e.g. #ffffff",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Force singleton behavior
        self.pk = 1
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return self.business_name or "Site Settings"


class BusinessHour(models.Model):
    site_settings = models.ForeignKey(
        SiteSettings,
        on_delete=models.CASCADE,
        related_name="business_hours",
    )
    label = models.CharField(
        max_length=100,
        help_text='Example: "Mon - Fri", "Saturday", "Sunday"',
    )
    open_time = models.TimeField(blank=True, null=True)
    close_time = models.TimeField(blank=True, null=True)
    is_closed = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Business Hour"
        verbose_name_plural = "Business Hours"

    def clean(self):
        from django.core.exceptions import ValidationError

        if self.is_closed:
            return

        if self.open_time is None or self.close_time is None:
            raise ValidationError(
                "Open time and close time are required unless this row is marked closed."
            )

        if self.open_time >= self.close_time:
            raise ValidationError("Open time must be earlier than close time.")

    def __str__(self):
        if self.is_closed:
            return f"{self.label}: Closed"
        return f"{self.label}: {self.open_time} - {self.close_time}"
