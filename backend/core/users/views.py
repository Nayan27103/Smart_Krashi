from rest_framework import generics
from .serializers import RegisterSerializer
from .models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class DashboardSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "stats": [
                {"title": "Healthy Crops", "value": "88%", "status": "+3% this week", "color": "bg-green-100 text-green-600", "icon": "Leaf"},
                {"title": "Soil Moisture", "value": "Optimal", "status": "Stable", "color": "bg-blue-100 text-blue-600", "icon": "Droplets"},
                {"title": "Weather Alert", "value": "Clear Skies", "status": "No rain expected", "color": "bg-indigo-100 text-indigo-600", "icon": "CloudRain"},
                {"title": "Wheat Avg Price", "value": "₹2,480/q", "status": "+₹30 since yday", "color": "bg-amber-100 text-amber-600", "icon": "TrendingUp"},
            ],
            "price_trend": [
                {"name": "Mon", "price": 2400},
                {"name": "Tue", "price": 2420},
                {"name": "Wed", "price": 2410},
                {"name": "Thu", "price": 2450},
                {"name": "Fri", "price": 2430},
                {"name": "Sat", "price": 2460},
                {"name": "Sun", "price": 2480},
            ],
            "rain_forecast": [
                {"name": "Mon", "rain": 5},
                {"name": "Tue", "rain": 10},
                {"name": "Wed", "rain": 0},
                {"name": "Thu", "rain": 0},
                {"name": "Fri", "rain": 2},
                {"name": "Sat", "rain": 0},
                {"name": "Sun", "rain": 0},
            ],
            "action_items": [
                {"title": "Irrigation scheduled", "desc": "Based on low soil moisture in Sector 4", "type": "info"},
                {"title": "Check wheat stalks", "desc": "Possible pest activity reported nearby", "type": "warning"}
            ]
        })