
from django.contrib import admin
from django.urls import path,include
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView



urlpatterns = [
    path('log_in/',log_in),
]
