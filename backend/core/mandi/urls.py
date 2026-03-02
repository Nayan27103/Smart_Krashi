from django.urls import path
from .views import MandiPricePredictionView

urlpatterns = [
    path("predict-price/", MandiPricePredictionView.as_view(), name="predict_price"),
]