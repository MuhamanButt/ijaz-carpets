from django.db import models
from .mongodb import db

product_collection = db['product']