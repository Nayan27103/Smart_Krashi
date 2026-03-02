from rest_framework import serializers
from .models import DiseasePrediction

class DiseasePredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiseasePrediction
        fields = '__all__'
        read_only_fields = ['user', 'predicted_disease', 'confidence']