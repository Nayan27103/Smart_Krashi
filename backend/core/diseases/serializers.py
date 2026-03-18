from rest_framework import serializers
from .models import Disease, Pesticide

class PesticideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pesticide
        fields = '__all__'

class DiseaseSerializer(serializers.ModelSerializer):
    pesticides = PesticideSerializer(many=True, read_only=True)

    class Meta:
        model = Disease
        fields = ['id', 'name', 'symptoms', 'treatment', 'prevention', 'pesticides']