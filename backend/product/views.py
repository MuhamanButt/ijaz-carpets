from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProductSerializer
import cloudinary
import cloudinary.uploader

from .mongodb import db
from .models import product_collection
from .utils import upload_images_on_cloudinary, generate_product_id,delete_images_from_cloudinary, delete_product_from_db  # Ensure these imports are correct

@api_view(['POST'])
def create_product(request):
    serializer = ProductSerializerRaw(data=request.data)
    if serializer.is_valid():
        validated_data = serializer.validated_data
        
        # Generate the product_id using the helper function
        product_id = generate_product_id(validated_data.get('product_name', ''))
        validated_data['product_id'] = product_id
        
        image_files = request.FILES.getlist('images_url')  # Use 'request.FILES' to get uploaded files
        try:
            image_urls = upload_images_on_cloudinary(image_files)
        except Exception as e:
            return Response({'status': 500, 'message': str(e)}, status=500)
        validated_data['images_url'] = image_urls  # Update validated data with image URLs
        
        product_collection.insert_one(validated_data)
        
        return Response({'message': 'Product created successfully', 'product_id': product_id}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def get_product(request):
    product_id = request.data.get('product_id')
    product = product_collection.find_one({"product_id": product_id})
    if product:
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_products_by_type(request):
    product_type = request.data.get('product_type')
    products = list(product_collection.find({"product_type": product_type}))
    if products:
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({'message': 'No products found for this type'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def update_product(request):
    product_id = request.data.get('product_id')
    serializer = ProductSerializer(data=request.data, partial=True)
    if serializer.is_valid():
        product_data = serializer.validated_data
        result = product_collection.update_one({"product_id": product_id}, {"$set": product_data})
        if result.modified_count:
            return Response({'message': 'Product updated'}, status=status.HTTP_200_OK)
        return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_product(request):
    product_id = request.data.get('product_id')
    if not product_id:
        return Response({'message': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Delete images and product
    try:
        delete_images_from_cloudinary(product_id)
        delete_product_from_db(product_id)
        return Response({'message': 'Product deleted'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({'status': 500, 'message': str(e)}, status=500)