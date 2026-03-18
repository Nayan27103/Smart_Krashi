from django.urls import path
from .views import DiseasePredictionView, WeatherView

urlpatterns = [
    path('predict-disease/', DiseasePredictionView.as_view(), name='predict_disease'),
    path('weather/', WeatherView.as_view(), name='weather'),
]