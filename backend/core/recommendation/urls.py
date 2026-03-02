from django.urls import path
from .views import CropRecommendationView

urlpatterns = [
    path("recommend-crop/", CropRecommendationView.as_view(), name="recommend_crop"),
]
