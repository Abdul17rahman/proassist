from django.urls import path
from .views import send_email, status


urlpatterns = [
    path('', status, name='status'),
    path('send-email/', send_email, name='send_email'),
]
