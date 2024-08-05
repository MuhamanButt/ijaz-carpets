from django.db import models
from .mongodb import db

# Create your models here.

order_collection = db['orders']