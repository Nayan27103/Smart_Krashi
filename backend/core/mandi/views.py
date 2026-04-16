from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import MarketPrice
from .serializers import MarketPriceSerializer
from .ml_service import predict_price

class MandiPricePredictionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = MarketPriceSerializer(data=request.data)

        if serializer.is_valid():
            crop_name = serializer.validated_data['crop_name']
            current_price = serializer.validated_data['price']

            # Use ML service for prediction
            predicted_price = predict_price(current_price, crop_name)

            market = serializer.save(
                user=request.user,
                predicted_price=predicted_price
            )

            # Generate simplified forecast data for the chart (next 30 days)
            forecast = [
                {"day": i, "price": round(current_price * (1 + (predicted_price/current_price - 1) * (i/30)), 2)}
                for i in range(1, 31, 5)
            ]

            return Response({
                "message": "Price Prediction Successful",
                "crop": market.crop_name,
                "mandi": market.mandi_location,
                "current_price": current_price,
                "predicted_price": predicted_price,
                "forecast_trend": forecast
            })

        return Response(serializer.errors, status=400)

class MandiPriceListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        crop = request.query_params.get('crop', 'wheat').lower()
        mandi = request.query_params.get('mandi', 'indore').lower()

        # In a real app, query MarketPrice model
        # For now, return realistic historical trend + current metrics
        historical = [
            {"date": "1 Mar", "price": 2100},
            {"date": "2 Mar", "price": 2150},
            {"date": "3 Mar", "price": 2130},
            {"date": "4 Mar", "price": 2180},
            {"date": "5 Mar", "price": 2200},
            {"date": "6 Mar", "price": 2250},
            {"date": "7 Mar", "price": 2280},
        ]

        return Response({
            "current_price": 2280,
            "change": 30,
            "percent_change": 1.3,
            "min_price": 2100,
            "max_price": 2350,
            "arrival_volume": "1,240 Tonnes",
            "quality_grade": "A (Premium)",
            "historical_trend": historical,
            "ai_suggestion": "Prices are showing an upward trend. Holding your stock for another 3-5 days could yield a 5% higher return based on historical arrival patterns."
        })