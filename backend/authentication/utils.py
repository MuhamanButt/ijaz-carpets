import bcrypt
from pymongo import MongoClient
from .models import admin_collection

def hashed_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def match_password(stored_hash, password):
    return bcrypt.checkpw(password.encode('utf-8'), stored_hash)


# ! this function will be used to create a user
def store_user(email, password):
    hashed_pw = hashed_password(password)
    
    # Check if the user already exists
    existing_user = admin_collection.find_one({"email": email})
    
    if existing_user:
        # Update existing user
        result = admin_collection.update_one(
            {"email": email},
            {"$set": {"password": hashed_pw}}
        )
        if result.modified_count > 0:
            return "Password updated successfully."
        else:
            return "Failed to update password."
    else:
        # Insert new user
        result = admin_collection.insert_one(
            {"email": email, "password": hashed_pw}
        )
        if result.inserted_id:
            return "User registered successfully."
        else:
            return "Failed to register user."
