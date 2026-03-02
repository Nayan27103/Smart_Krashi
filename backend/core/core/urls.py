from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    #admin
    path('admin/', admin.site.urls),

    #auth
    path('api/auth/', include('users.urls')),
    path('api/auth/login/', TokenObtainPairView.as_view()),
    path('api/auth/refresh/', TokenRefreshView.as_view()),


    #crops
    path('api/', include('crops.urls')),

    #disease
    path('api/', include('diseases.urls')),

    #prediction
    path('api/', include('predictions.urls')),

    #soil
    path('api/', include('soil.urls')),

    #mandi 
    path('api/', include('mandi.urls')),

    #recommendation
    path('api/', include('recommendation.urls')),
    

     

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)