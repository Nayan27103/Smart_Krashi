from django.urls import path
from .views import DiseasePredictionView

urlpatterns = [
    path('predict-disease/', DiseasePredictionView.as_view(), name='predict_disease'),
]