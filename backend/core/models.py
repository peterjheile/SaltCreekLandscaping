from django.db import models



class SiteSettings(models.Model):
    business_name = models.CharField(max_length=255)
    tagline = models.CharField(max_length=255, blank=True)

    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    address = models.CharField(max_length=255, blank=True)

    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    zip_code = models.CharField(max_length=20, blank=True)

    service_area = models.CharField(
        max_length=255,
        blank=True,
        help_text="Example: Bloomington, IN and surrounding areas"
    )

    hours = models.TextField(
        blank=True,
        help_text="Example: Mon-Fri 8am-6pm"
    )

    facebook_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    google_business_url = models.URLField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    
    #allow only one
    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return self.business_name
    

class HomePage(models.Model):
    hero_title = models.CharField(max_length=255)
    hero_subtitle = models.TextField(blank=True)
    hero_cta_text = models.CharField(max_length=100, blank=True)
    hero_cta_link = models.CharField(max_length=255, blank=True)

    hero_background_image = models.ImageField(
        upload_to="homepage/",
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    #allow only one
    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Home Page"
        verbose_name_plural = "Home Page"

    def __str__(self):
        return "Home Page Content"
    


class AboutSection(models.Model):
    heading = models.CharField(max_length=255, default="About Us")
    subheading = models.CharField(max_length=255, blank=True)
    content = models.TextField()

    image = models.ImageField(
        upload_to="about/",
        blank=True,
        null=True
    )

    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "id"]
        verbose_name = "About Section"
        verbose_name_plural = "About Sections"

    def __str__(self):
        return f"{self.display_order} - {self.heading}"