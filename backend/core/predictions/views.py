import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import DiseasePrediction
from .serializers import DiseasePredictionSerializer
from .ml_service import predict_disease

class DiseasePredictionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = DiseasePredictionSerializer(data=request.data)

        if serializer.is_valid():
            image = serializer.validated_data['image']

            # Call AI logic
            disease, confidence = predict_disease(image)

            prediction = serializer.save(
                user=request.user,
                predicted_disease=disease,
                confidence=confidence
            )

            # Get pesticides
            pesticides = disease.pesticides.all() if disease else []

            pesticide_list = [
                {
                    "name": p.name,
                    "market_price": p.market_price,
                    "dosage": p.dosage,
                    "safety_instructions": p.safety_instructions
                }
                for p in pesticides
            ]

            return Response({
                "message": "Prediction successful",
                "disease": disease.name if disease else None,
                "confidence": confidence,
                "recommended_pesticides": pesticide_list,
                "image": prediction.image.url
            })

        return Response(serializer.errors, status=400)

class WeatherView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        location = request.query_params.get('location', 'Indore')
        api_key = settings.OPENWEATHER_API_KEY
        if not api_key:
            return Response({"error": "OpenWeather API Key not configured"}, status=500)
        
        url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}&units=metric"
        response = requests.get(url)
        if response.status_code == 200:
            return Response(response.json())
        return Response({"error": "Unable to fetch weather data"}, status=400)
        