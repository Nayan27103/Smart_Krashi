from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .engine import recommend_crop

class CropRecommendationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        n = request.data.get("nitrogen")
        p = request.data.get("phosphorus")
        k = request.data.get("potassium")
        ph = request.data.get("ph")
        temp = request.data.get("temperature")
        humidity = request.data.get("humidity")

        if not all([n, p, k, ph, temp, humidity]):
            return Response({"error": "All fields required"}, status=400)

        crop, reason = recommend_crop(
            float(n), float(p), float(k),
            float(ph), float(temp), float(humidity)
        )

        return Response({
            "recommended_crop": crop,
            "reason": reason
        })