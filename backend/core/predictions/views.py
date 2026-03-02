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
        