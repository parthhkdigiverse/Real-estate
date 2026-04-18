import asyncio
import os
import sys
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load env from backend/.env
# We assume this script is run from the backend directory or via app.py
load_dotenv(os.path.join(os.path.dirname(__file__), "../../.env"))

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

if not MONGODB_URL:
    print("ERROR: MONGODB_URL not found in environment")
    sys.exit(1)

PROPERTIES = [
    {
        "slug": "cullinan-house",
        "name": "Cullinan House",
        "hero": "/assets/hero-cullinan-pool.jpg",
        "intro": "The central hub of The Sandars later living village, Cullinan House is a Grade II listed building that places you at the centre of the community. Here you'll find the perfect haven for your retirement with open-plan apartments available to buy or rent.",
        "showApartmentNote": "Show apartment available to view",
        "hours": "Open from 10am – 5pm Monday – Friday",
        "featured_image": "/assets/prop-cullinan.jpg",
        "tag": "For Sale",
        "date": "18 November 2024",
        "is_featured": True,
        "apartments": [
            {"name": "No.1 Cullinan House", "type": "1 Bedroom", "size": "76 sq m", "price": "On request", "slug": "no-1-cullinan-house"},
            {"name": "No.2 Cullinan House", "type": "1 Bedroom", "size": "72 sq m", "price": "On request", "slug": "no-2-cullinan-house"},
            {"name": "No.3 Cullinan House", "type": "1 Bedroom", "size": "72 sq m", "price": "On request", "slug": "no-3-cullinan-house"},
            {"name": "No.4 Cullinan House", "type": "2 Bedroom", "size": "91 sq m", "price": "On request", "slug": "no-4-cullinan-house"},
            {"name": "No.5 Cullinan House", "type": "1 Bedroom", "size": "74 sq m", "price": "On request", "slug": "no-5-cullinan-house"},
            {"name": "No.6 Cullinan House", "type": "1 Bedroom", "size": "77 sq m", "price": "On request", "slug": "no-6-cullinan-house"},
            {"name": "No.7 Cullinan House", "type": "2 Bedroom", "size": "101 sq m", "price": "On request", "slug": "no-7-cullinan-house"},
            {"name": "No.11 Cullinan House", "type": "1 Bedroom", "size": "66 sq m", "price": "On request", "slug": "no-11-cullinan-house"},
            {"name": "No.13 Cullinan House", "type": "1 Bedroom", "size": "61 sq m", "price": "On request", "slug": "no-13-cullinan-house"},
            {"name": "No.14 Cullinan House", "type": "1 Bedroom", "size": "61 sq m", "price": "On request", "slug": "no-14-cullinan-house"},
            {"name": "No.15 Cullinan House", "type": "2 Bedroom", "size": "83 sq m", "price": "On request", "slug": "no-15-cullinan-house"},
            {"name": "No.16 Cullinan House", "type": "1 Bedroom", "size": "61 sq m", "price": "On request", "slug": "no-16-cullinan-house"},
            {"name": "No.18 Cullinan House", "type": "1 Bedroom", "size": "77 sq m", "price": "On request", "slug": "no-18-cullinan-house"},
            {"name": "No.19 Cullinan House", "type": "1 Bedroom", "size": "67 sq m", "price": "On request", "slug": "no-19-cullinan-house"},
            {"name": "No.21 Cullinan House", "type": "1 Bedroom", "size": "74 sq m", "price": "On request", "slug": "no-21-cullinan-house"},
            {"name": "No.22 Cullinan House", "type": "2 Bedroom", "size": "102 sq m", "price": "On request", "slug": "no-22-cullinan-house"},
        ]
    },
    {
        "slug": "pollards-court",
        "name": "Pollards Court",
        "hero": "/assets/hero-pollards.jpg",
        "intro": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ullamcorper erat a nunc dictum, quis consectetur turpis posuere. Aliquam quis enim nec nunc lacinia ullamcorper.",
        "showApartmentNote": "Show apartment available to view",
        "hours": "Open from 10am – 5pm Monday – Friday",
        "featured_image": "/assets/prop-pollards.jpg",
        "tag": "For Sale",
        "date": "22 November 2024",
        "is_featured": True,
        "apartments": [
            {"name": "No.1 Pollards Court", "type": "2 Bedroom", "size": "124 sq m", "price": "On request", "slug": "no-1-pollards-court"},
            {"name": "No.4 Pollards Court", "type": "2 Bedroom", "size": "124 sq m", "price": "On request", "slug": "no-4-pollards-court"},
        ]
    },
    {
        "slug": "eastley-end-house",
        "name": "Eastley End House",
        "hero": "/assets/hero-eastley.jpg",
        "intro": "Exuding Georgian charm and character, Eastley End House is a three-storey block originally built in the late 18th century and contains a number of luxury apartments. A grade II listed building, Eastley End House is the perfect place to combine all your modern comforts with some historic charm.",
        "showApartmentNote": "Show apartment available to view",
        "hours": "Open from 10am – 5pm Monday – Friday",
        "featured_image": "/assets/prop-eastley.jpg",
        "tag": "For Sale",
        "date": "22 November 2024",
        "is_featured": True,
        "apartments": [
            {"name": "No.4 Eastley End House", "type": "2 Bedroom", "size": "118 sq m", "price": "On request", "slug": "no-4-eastley-end-house"},
            {"name": "No.6 Eastley End House", "type": "1 Bedroom", "size": "92 sq m", "price": "On request", "slug": "no-6-eastley-end-house"},
        ]
    },
    {
        "slug": "meadlake-house",
        "name": "Meadlake House",
        "hero": "/assets/hero-meadlake.jpg",
        "intro": "A grade 2 listed Georgian House offering one and two bedroom luxury living apartments, including Duplex and Penthouse options.Set in stunning picturesque gardens and parkland, it benefits from a whole range of amenities right on its doorstep.",
        "showApartmentNote": "Show apartment available to view",
        "hours": "Open from 10am – 5pm Monday – Friday",
        "is_featured": False,
        "apartments": [
            {"name": "No.2 Meadlake House", "type": "1 Bedroom", "size": "88 sq m", "price": "On request", "slug": "no-2-meadlake-house"},
            {"name": "No.5 Meadlake House", "type": "2 Bedroom Duplex", "size": "156 sq m", "price": "On request", "slug": "no-5-meadlake-house"},
            {"name": "Penthouse, Meadlake House", "type": "2 Bedroom Penthouse", "size": "182 sq m", "price": "On request", "slug": "penthouse-meadlake-house"},
        ]
    }
]

async def seed():
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    
    print(f"Connecting to {DATABASE_NAME}...")
    
    # Clear existing properties
    await db.properties.delete_many({})
    print("Cleared existing properties.")
    
    # Insert new properties
    result = await db.properties.insert_many(PROPERTIES)
    print(f"Successfully seeded {len(result.inserted_ids)} properties.")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed())
