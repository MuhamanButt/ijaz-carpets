from rest_framework import serializers
from django.core.files.uploadedfile import InMemoryUploadedFile

class OrderSerializerRaw(serializers.Serializer):
    address = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    firstName = serializers.CharField(max_length=255)
    lastName = serializers.CharField(max_length=255, allow_blank=True)
    phone = serializers.CharField(max_length=15)
    postalCode = serializers.CharField(max_length=10)
    total_amount = serializers.IntegerField()
    items = serializers.ListField(child=serializers.CharField())
    transaction_url = serializers.ImageField()  # Single file object
    is_completed = serializers.BooleanField(default=False)
    is_important = serializers.BooleanField(default=False)
    is_shipping_applied = serializers.BooleanField(default=False)
    is_viewed = serializers.BooleanField(default=False)

class OrderSerializer(serializers.Serializer):
    order_id = serializers.CharField(max_length=255)
    address = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    firstName = serializers.CharField(max_length=255)
    lastName = serializers.CharField(max_length=255, allow_blank=True)
    phone = serializers.CharField(max_length=15)
    postalCode = serializers.CharField(max_length=10)
    total_amount = serializers.IntegerField()
    items = serializers.ListField(child=serializers.CharField())
    transaction_url = serializers.CharField()  # Assuming URL to be a string
    is_completed = serializers.BooleanField(default=False)
    is_important = serializers.BooleanField(default=False)
    is_shipping_applied = serializers.BooleanField(default=False)
    is_viewed = serializers.BooleanField(default=False)
    creation_time = serializers.IntegerField()
