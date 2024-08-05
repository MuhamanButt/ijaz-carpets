from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import time
from .serializers import *
from .utils import *
# Create Order
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import time
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
import time

@api_view(['POST'])
def create_order(request):
    serializer = OrderSerializerRaw(data=request.data)
    
    if serializer.is_valid():
        validated_data = serializer.validated_data
        
        # Generate a unique order ID
        order_id = generate_order_id()
        validated_data['order_id'] = order_id
        validated_data['creation_time'] = int(time.time())
        
        # Handle file upload
        transaction_file = request.FILES.get('transaction_url')
        if transaction_file:
            transaction_url = upload_image_on_cloudinary(transaction_file)
            validated_data['transaction_url'] = transaction_url
        
        # Handle items data
        items_data = request.data.get('items', '[]')  # Get items field, default to empty list if not present
        try:
            items = json.loads(items_data)  # Parse JSON string to list of dicts
            validated_data['items'] = items
        except json.JSONDecodeError:
            return Response({'error': 'Invalid format for items field'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Save to database
        order_collection.insert_one(validated_data)
        
        return Response({'message': 'Order created successfully', 'order_id': order_id}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get Order
@api_view(['GET'])
def get_order(request):
    order_id = request.query_params.get('order_id')
    order = order_collection.find_one({"order_id": order_id})
    if order:
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

# Get All Orders
@api_view(['GET'])
def get_all_orders(request):
    orders = list(order_collection.find())
    if orders:
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({'message': 'No orders found'}, status=status.HTTP_404_NOT_FOUND)

# Update Order
# Update Order
@api_view(['PUT'])
def update_order(request):
    serializer = OrderSerializer(data=request.data)
    
    if serializer.is_valid():
        validated_data = serializer.validated_data
        order_id = validated_data.get('order_id')
        
        # Update order details
        result = order_collection.update_one({"order_id": order_id}, {"$set": validated_data})
        
        if result.modified_count:
            return Response({'message': 'Order updated'}, status=status.HTTP_200_OK)
        return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Delete Order
@api_view(['DELETE'])
def delete_order(request):
    order_id = request.query_params.get('order_id')
    if not order_id:
        return Response({'message': 'Order ID is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Handle file deletion if necessary
        delete_order_from_db(order_id)
        return Response({'message': 'Order deleted'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({'status': 500, 'message': str(e)}, status=500)
