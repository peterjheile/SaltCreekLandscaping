from django.db import models
import uuid





class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()

    phone = models.CharField(
        max_length=20,
        blank=True,
        help_text="Optional phone number for follow-up",
    )

    subject = models.CharField(
        max_length=150,
        help_text="Short subject line to help organize messages",
    )

    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"
    







class QuoteRequest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=100)
    email = models.EmailField()

    phone = models.CharField(
        max_length=20,
        blank=True,
        help_text="Optional phone number for follow-up",
    )

    service_category = models.ForeignKey(
        "marketing.ServiceCategory",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="quote_requests",
        help_text="Selected service category for this quote request.",
    )

    service_category_title = models.CharField(
        max_length=120,
        blank=True,
        help_text="Snapshot of the selected service category title at submission time.",
    )

    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["created_at"]),
            models.Index(fields=["service_category"]),
        ]
        verbose_name = "Quote Request"
        verbose_name_plural = "Quote Requests"

    def save(self, *args, **kwargs):
        if self.service_category and not self.service_category_title:
            self.service_category_title = self.service_category.title
        super().save(*args, **kwargs)

    def __str__(self):
        if self.service_category_title:
            return f"{self.name} - {self.service_category_title}"
        return f"{self.name} - Quote Request"