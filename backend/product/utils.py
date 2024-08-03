import cloudinary
import cloudinary.uploader
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.response import Response
from .models import product_collection
import time


# Configure Cloudinary
cloudinary.config(
    cloud_name="dmlxb4ea9",
    api_key="797859561564233",
    api_secret="aBk_O_ropa3Qq6HOfJsn4oWkyt0",
    secure=True
)

def upload_images_on_cloudinary(image_files):
    image_urls = []
    for image_file in image_files:
        if isinstance(image_file, InMemoryUploadedFile):
            try:
                # Upload to Cloudinary
                response = cloudinary.uploader.upload(image_file)
                image_urls.append(response.get('url'))
            except Exception as e:
                raise Exception(f"Error uploading image: {str(e)}")
        else:
            raise ValueError("File is not an InMemoryUploadedFile")
    return image_urls

def generate_product_id(product_name):
    """Generate a unique product_id based on product_name and current timestamp."""
    product_name_clean = product_name.strip().lower().replace(' ', '_')
    timestamp = int(time.time())  # Get current timestamp
    return f"{product_name_clean}_{timestamp}"


def delete_images_from_cloudinary(product_id):
    """Delete images associated with a product from Cloudinary."""
    product = product_collection.find_one({"product_id": product_id})
    if not product:
        raise ValueError("Product not found")

    # Extract image URLs and get their public IDs
    image_urls = product.get('images_url', [])
    public_ids = [url.split('/')[-1].split('.')[0] for url in image_urls]

    # Delete images from Cloudinary
    for public_id in public_ids:
        try:
            cloudinary.uploader.destroy(public_id)
        except Exception as e:
            raise Exception(f"Error deleting image from Cloudinary: {str(e)}")

def delete_product_from_db(product_id):
    """Delete a product from MongoDB."""
    result = product_collection.delete_one({"product_id": product_id})
    if not result.deleted_count:
        raise ValueError("Product not found")