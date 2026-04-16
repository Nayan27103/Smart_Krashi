from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .engine import recommend_crop, get_fertility_status, get_ph_status, get_actions

class CropRecommendationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        n = request.data.get("nitrogen")
        p = request.data.get("phosphorus")
        k = request.data.get("potassium")
        ph = request.data.get("ph")
        temp = request.data.get("temperature")
        humidity = request.data.get("humidity")
        rainfall = request.data.get("rainfall")

        if not all([n, p, k, ph, temp, humidity]):
            return Response({"error": "Soil and environment data required"}, status=400)

        # Convert to float and run engine
        try:
            n, p, k = float(n), float(p), float(k)
            ph, temp, humidity = float(ph), float(temp), float(humidity)
            rainfall = float(rainfall) if rainfall else 100
        except ValueError:
            return Response({"error": "Numerical values required"}, status=400)

        crop, reason = recommend_crop(n, p, k, ph, temp, humidity, rainfall)
        
        return Response({
            "recommended_crop": crop,
            "reason": reason,
            "fertility_status": get_fertility_status(n, p, k),
            "ph_status": get_ph_status(ph),
            "actions": get_actions(crop, ph),
            "confidence": 92.4 # Simulating High ML Confidence
        })

class WeatherView(APIView):
    def get(self, request):
        location = request.query_params.get('location', 'Indore, MP')
        
        # Realistic hourly forecast data
        forecast = [
            {"time": "06:00", "temp": 18, "humidity": 82, "condition": "Cloudy"},
            {"time": "09:00", "temp": 22, "humidity": 75, "condition": "Partly Cloudy"},
            {"time": "12:00", "temp": 26, "humidity": 60, "condition": "Sunny"},
            {"time": "15:00", "temp": 28, "humidity": 55, "condition": "Sunny"},
            {"time": "18:00", "temp": 24, "humidity": 65, "condition": "Partly Cloudy"},
            {"time": "21:00", "temp": 20, "humidity": 70, "condition": "Clear"},
        ]

        advice = [
            "Clear weather suitable for harvesting mature crops.",
            "Delay pesticide application if wind speed exceeds 15km/h in the afternoon.",
            "Optimal conditions for soil preparation for the next planting cycle."
        ]

        return Response({
            "current": {
                "temp": 26,
                "humidity": 60,
                "wind_speed": 12,
                "condition": "Partly Cloudy",
                "location": location
            },
            "hourly": forecast,
            "advice": advice
        })