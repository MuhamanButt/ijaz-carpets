from django.urls import path
from .views import *

urlpatterns = [
    path('create_product/', create_product),
    path('get_product/', get_product),
    path('get_products_by_type/', get_products_by_type),
    path('update_product/', update_product),
    path('delete_product/',delete_product),
]
