from django.db import models
from users.models import User
from django.utils import timezone

class MarketPrice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    crop_name = models.CharField(max_length=100)
    mandi_location = models.CharField(max_length=100)

    price = models.FloatField()
    predicted_price = models.FloatField(blank=True, null=True)
    date = models.DateField(default=timezone.now)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.crop_name} - {self.mandi_location} - {self.date}"