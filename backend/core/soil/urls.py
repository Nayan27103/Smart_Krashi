from django.urls import path
from .views import SoilPredictionView

urlpatterns = [
    path('predict-soil/', SoilPredictionView.as_view(), name='predict_soil'),
]