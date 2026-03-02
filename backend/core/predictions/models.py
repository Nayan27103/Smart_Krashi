from django.db import models
from users.models import User
from diseases.models import Disease

class DiseasePrediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='disease_images/')
    predicted_disease = models.ForeignKey(Disease, on_delete=models.SET_NULL, null=True)
    confidence = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prediction by {self.user.username}"