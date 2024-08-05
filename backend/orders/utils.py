import cloudinary
import cloudinary.uploader
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.response import Response
from .models import order_collection
import time
import uuid


# Configure Cloudinary
cloudinary.config(
    cloud_name="dmlxb4ea9",
    api_key="797859561564233",
    api_secret="aBk_O_ropa3Qq6HOfJsn4oWkyt0",
    secure=True
)

def upload_image_on_cloudinary(image_file):
    image_url = []
    if isinstance(image_file, InMemoryUploadedFile):
        try:
            # Upload to Cloudinary
            response = cloudinary.uploader.upload(image_file)
            return response.get('url')
        except Exception as e:
            raise Exception(f"Error uploading image: {str(e)}")
    else:
        raise ValueError("File is not an InMemoryUploadedFile")

def generate_order_id():
    return str(uuid.uuid4())


def delete_image_from_cloudinary(image_url):
    """Delete a single image from Cloudinary."""
    if not image_url:
        raise ValueError("No image URL provided")

    # Extract the public ID from the URL
    public_id = image_url.split('/')[-1].split('.')[0]

    # Delete the image from Cloudinary
    try:
        cloudinary.uploader.destroy(public_id)
    except Exception as e:
        raise Exception(f"Error deleting image from Cloudinary: {str(e)}")

def delete_order_from_db(order_id):
    """Delete a order from MongoDB."""
    result = order_collection.delete_one({"order_id": order_id})
    if not result.deleted_count:
        raise ValueError("order not found")