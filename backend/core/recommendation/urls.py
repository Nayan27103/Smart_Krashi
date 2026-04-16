from django.urls import path
from .views import CropRecommendationView, WeatherView

urlpatterns = [
    path("recommend-crop/", CropRecommendationView.as_view(), name="recommend_crop"),
    path("weather/current/", WeatherView.as_view(), name="current_weather"),
]
