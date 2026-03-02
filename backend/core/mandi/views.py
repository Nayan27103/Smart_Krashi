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
            current_price = serializer.validated_data['current_price']

            predicted_price = predict_price(current_price)

            market = serializer.save(
                user=request.user,
                predicted_price=predicted_price
            )

            return Response({
                "message": "Price Prediction Successful",
                "crop": market.crop_name,
                "mandi": market.mandi_location,
                "current_price": current_price,
                "predicted_price": predicted_price
            })

        return Response(serializer.errors, status=400)