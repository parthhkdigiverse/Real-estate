import asyncio
import os
import sys
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
sys.path.append(os.path.join(os.path.dirname(__file__), "../.."))
from app.core import security

# Load env from backend/.env
load_dotenv(os.path.join(os.path.dirname(__file__), "../../.env"))

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

async def seed_admin():
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    
    admin_user = {
        "username": "Admin",
        "hashed_password": security.get_password_hash("Admin123")
    }
    
    # Check if user exists
    existing_user = await db.users.find_one({"username": admin_user["username"]})
    if existing_user:
        await db.users.update_one(
            {"username": admin_user["username"]},
            {"$set": {"hashed_password": admin_user["hashed_password"]}}
        )
        print(f"Updated existing admin user: {admin_user['username']}")
    else:
        await db.users.insert_one(admin_user)
        print(f"Created new admin user: {admin_user['username']}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_admin())
