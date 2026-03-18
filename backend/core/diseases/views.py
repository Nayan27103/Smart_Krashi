from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Disease
from .serializers import DiseaseSerializer

class DiseaseViewSet(viewsets.ModelViewSet):
    serializer_class = DiseaseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Disease.objects.all()
        crop_name = self.request.query_params.get('crop', None)
        if crop_name:
            queryset = queryset.filter(crop__name__icontains=crop_name)
        return queryset