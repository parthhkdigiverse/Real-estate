import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load env from backend/.env
load_dotenv(os.path.join(os.path.dirname(__file__), "../../.env"))

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

async def fix_paths():
    if not MONGODB_URL:
        print("ERROR: MONGODB_URL not found")
        return

    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    
    properties = db.properties
    count = 0
    
    async for prop in properties.find():
        updates = {}
        
        # Helper to strip Prefix
        def clean_path(path):
            if path and "/assets/properties/" in path:
                return path.replace("/assets/properties/", "/assets/")
            return path

        # Check property level fields
        new_hero = clean_path(prop.get("hero"))
        if new_hero != prop.get("hero"):
            updates["hero"] = new_hero
            
        new_feat = clean_path(prop.get("featured_image"))
        if new_feat != prop.get("featured_image"):
            updates["featured_image"] = new_feat
            
        # Check apartments
        apartments = prop.get("apartments", [])
        apt_updated = False
        new_apartments = []
        
        for apt in apartments:
            changed = False
            for field in ["hero_image", "floorplan_image", "location_map_image"]:
                old_val = apt.get(field)
                new_val = clean_path(old_val)
                if new_val != old_val:
                    apt[field] = new_val
                    changed = True
            
            new_apartments.append(apt)
            if changed:
                apt_updated = True
                
        if apt_updated:
            updates["apartments"] = new_apartments
            
        if updates:
            await properties.update_one({"_id": prop["_id"]}, {"$set": updates})
            print(f"Updated paths for property: {prop.get('name')} ({prop.get('slug')})")
            count += 1
            
    print(f"\nRepair complete. Updated {count} property records.")
    client.close()

if __name__ == "__main__":
    asyncio.run(fix_paths())
