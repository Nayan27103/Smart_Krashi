from rest_framework import serializers
from .models import SoilRecord

class SoilSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoilRecord
        fields = '__all__'
        read_only_fields = ['user', 'predicted_crop', 'fertility_level']