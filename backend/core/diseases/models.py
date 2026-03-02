from django.db import models
from crops.models import Crop

class Disease(models.Model):
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE, related_name='diseases')
    name = models.CharField(max_length=100)
    symptoms = models.TextField()
    treatment = models.TextField()
    prevention = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.crop.name})"

class Pesticide(models.Model):
    disease = models.ForeignKey(Disease, on_delete=models.CASCADE, related_name='pesticides')
    name = models.CharField(max_length=100)
    market_price = models.FloatField()
    dosage = models.CharField(max_length=200)
    safety_instructions = models.TextField()

    def __str__(self):
        return f"{self.name} - {self.disease.name}"