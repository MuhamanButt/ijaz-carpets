from rest_framework import serializers
from django.core.files.uploadedfile import InMemoryUploadedFile
import cloudinary.uploader

class ProductSerializerRaw(serializers.Serializer):
    product_name = serializers.CharField(max_length=255)
    product_type = serializers.CharField(max_length=255)
    product_price_old = serializers.IntegerField(default = 0)
    product_price_new = serializers.IntegerField()
    product_description = serializers.CharField()
    estimated_delivery_days = serializers.IntegerField()
    hide = serializers.BooleanField(default=False)
    images_url = serializers.ListField(child=serializers.ImageField(), write_only=True)
    on_sale = serializers.BooleanField(default=False)
    out_of_stock = serializers.BooleanField(default=False)
    quantity_available = serializers.IntegerField()
    sizes_available = serializers.ListField(child=serializers.CharField())

class ProductSerializer(serializers.Serializer):
    product_id = serializers.CharField(max_length=255)
    product_name = serializers.CharField(max_length=255)
    product_type = serializers.CharField(max_length=255)
    product_price_old = serializers.IntegerField(default = 0)
    product_price_new = serializers.IntegerField()
    product_description = serializers.CharField()
    estimated_delivery_days = serializers.IntegerField()
    hide = serializers.BooleanField(default=False)
    images_url = serializers.ListField(child=serializers.CharField())
    on_sale = serializers.BooleanField(default=False)
    out_of_stock = serializers.BooleanField(default=False)
    quantity_available = serializers.IntegerField()
    sizes_available = serializers.ListField(child=serializers.CharField())
    creation_time = serializers.IntegerField()


class ProductSerializerUpdate(serializers.Serializer):
    product_id = serializers.CharField(max_length=255)
    product_name = serializers.CharField(max_length=255)
    product_type = serializers.CharField(max_length=255)
    product_price_old = serializers.IntegerField(default = 0)
    product_price_new = serializers.IntegerField()
    product_description = serializers.CharField()
    estimated_delivery_days = serializers.IntegerField()
    hide = serializers.BooleanField(default=False)
    on_sale = serializers.BooleanField(default=False)
    out_of_stock = serializers.BooleanField(default=False)
    quantity_available = serializers.IntegerField()
    sizes_available = serializers.ListField(child=serializers.CharField())