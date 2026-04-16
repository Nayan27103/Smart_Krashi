from django.urls import path
from .views import MandiPricePredictionView, MandiPriceListView

urlpatterns = [
    path("predict-price/", MandiPricePredictionView.as_view(), name="predict_price"),
    path("get-prices/", MandiPriceListView.as_view(), name="get_prices"),
]