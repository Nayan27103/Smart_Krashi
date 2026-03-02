from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import SoilRecord
from .serializers import SoilSerializer
from .ml_service import predict_soil

class SoilPredictionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SoilSerializer(data=request.data)

        if serializer.is_valid():
            n = serializer.validated_data['nitrogen']
            p = serializer.validated_data['phosphorus']
            k = serializer.validated_data['potassium']
            ph = serializer.validated_data['ph']
            temp = serializer.validated_data['temperature']
            humidity = serializer.validated_data['humidity']

            predicted_crop, fertility = predict_soil(n, p, k, ph, temp, humidity)

            soil_record = serializer.save(
                user=request.user,
                predicted_crop=predicted_crop,
                fertility_level=fertility
            )

            return Response({
                "message": "Soil Prediction Successful",
                "predicted_crop": predicted_crop,
                "fertility_level": fertility
            })

        return Response(serializer.errors, status=400)