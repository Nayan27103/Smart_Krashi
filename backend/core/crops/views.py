from rest_framework import viewsets
from .models import Crop
from .serializers import CropSerializer
from rest_framework.permissions import IsAuthenticated

class CropViewSet(viewsets.ModelViewSet):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer
    permission_classes = [IsAuthenticated]