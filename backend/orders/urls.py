from django.urls import path
from .views import create_order, get_order, get_all_orders, update_order, delete_order

urlpatterns = [
    path('create_order/', create_order),
    path('get_order/', get_order),
    path('get_all_orders/', get_all_orders),
    path('update_order/', update_order),
    path('delete_order/', delete_order),
]
