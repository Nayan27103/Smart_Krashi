from django.db import models
from users.models import User

class SoilRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    nitrogen = models.FloatField()
    phosphorus = models.FloatField()
    potassium = models.FloatField()
    ph = models.FloatField()
    temperature = models.FloatField()
    humidity = models.FloatField()

    predicted_crop = models.CharField(max_length=100)
    fertility_level = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Soil by {self.user.username}"