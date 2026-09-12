from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("crm_app.urls")),
    path('api/',include("crm_app.api_urls"))
]
