from django.db import models
from .mongodb import db

admin_collection = db['admin']