
import re
import cloudinary
import cloudinary.uploader
import time

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


from .mongodb import *
from .models import *
from .serializers import *
from .utils import *

@api_view(['POST'])
def create_product(request):
    serializer = ProductSerializerRaw(data=request.data)
    
    print('request.data',request.data)  # For debugging purposes
    if serializer.is_valid():
        validated_data = serializer.validated_data
        
        # Generate the product_id using the helper function
        product_id = generate_product_id(validated_data.get('product_name', ''))
        validated_data['product_id'] = product_id
        validated_data['creation_time'] = int(time.time()) 
        
        image_files = request.FILES.getlist('images_url')  # Use 'request.FILES' to get uploaded files
        try:
            image_urls = upload_images_on_cloudinary(image_files)
        except Exception as e:
            return Response({'status': 500, 'message': str(e)}, status=500)
        validated_data['images_url'] = image_urls  
        
        # sizes_available = validated_data.get('sizes_available', [])
        # if isinstance(sizes_available, list) and all(isinstance(size, str) for size in sizes_available):
        
        #     validated_data['sizes_available'] = sizes_available
        # elif isinstance(sizes_available, str):
        #     validated_data['sizes_available'] = sizes_available.split(',')

        product_collection.insert_one(validated_data)
        
        return Response({'message': 'Product created successfully', 'product_id': product_id}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_product(request):
    product_id = request.query_params.get('product_id')
    product = product_collection.find_one({"product_id": product_id})
    if product:
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_all_products(request):

    products = list(product_collection.find())
    if products:
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({'message': 'No products found'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
def get_products_by_type(request):
    product_type = request.query_params.get('product_type')

    products = list(product_collection.find({"product_type": product_type}))
    if products:
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({'message': 'No products found for this type'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_products_by_name(request):
    product_name = request.query_params.get('product_name', '')

    # Create a case-insensitive regex pattern for matching
    regex_pattern = re.compile(f".*{re.escape(product_name)}.*", re.IGNORECASE)

    # Update query to include products where `hide` is True
    query = {
        "product_name": {"$regex": regex_pattern},
        "hide": False
    }

    suggestions = list(product_collection.find(query).limit(3))

    if suggestions:
        serializer = ProductSerializer(suggestions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({'message': 'No products found for this type'}, status=status.HTTP_404_NOT_FOUND)

    
    
@api_view(['PUT'])
def update_product(request):
    serializer = ProductSerializerUpdate(data=request.data)
    
    print('request.data', request.data)  # For debugging purposes
    
    if serializer.is_valid():
        validated_data = serializer.validated_data
        # Use the existing product_id or handle its generation
        old_product_id = validated_data.get('product_id')
        # new_product_id = generate_product_id(validated_data.get('product_name', ''))
        
        # validated_data['product_id'] = old_product_id
        
        # sizes_available = validated_data.get('sizes_available', [])
        # if isinstance(sizes_available, list) and all(isinstance(size, str) for size in sizes_available):
        #     validated_data['sizes_available'] = sizes_available
        # elif isinstance(sizes_available, str):
        #     validated_data['sizes_available'] = sizes_available.split(',')
        
        result = product_collection.update_one({"product_id": old_product_id}, {"$set": validated_data})
        
        if result.modified_count:
            return Response({'message': 'Product updated'}, status=status.HTTP_200_OK)
        return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_product(request):
    product_id = request.query_params.get('product_id')  
    if not product_id:
        return Response({'message': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Delete images and product
    try:
        delete_images_from_cloudinary(product_id)
        delete_product_from_db(product_id)
        return Response({'message': 'Product deleted'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({'status': 500, 'message': str(e)}, status=500)