from fastapi import APIRouter, HTTPException, Body
from typing import List
from app.db.mongodb import get_database
from app.models.property import PropertyModel, PropertyResponse
from bson import ObjectId

router = APIRouter()

@router.get("/", response_model=List[PropertyResponse])
async def get_properties():
    db = get_database()
    properties = []
    async for prop in db.properties.find():
        prop["_id"] = str(prop["_id"])
        properties.append(prop)
    return properties

@router.get("/{slug}", response_model=PropertyResponse)
async def get_property(slug: str):
    db = get_database()
    prop = await db.properties.find_one({"slug": slug})
    if prop:
        prop["_id"] = str(prop["_id"])
        return prop
    raise HTTPException(status_code=404, detail="Property not found")

@router.post("/", response_model=PropertyResponse)
async def create_property(property: PropertyModel = Body(...)):
    db = get_database()
    new_prop = await db.properties.insert_one(property.dict())
    created_prop = await db.properties.find_one({"_id": new_prop.inserted_id})
    created_prop["_id"] = str(created_prop["_id"])
    return created_prop

@router.put("/{id}", response_model=PropertyResponse)
async def update_property(id: str, property: PropertyModel = Body(...)):
    db = get_database()
    # Ensure ID is valid ObjectId
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    updated_result = await db.properties.update_one(
        {"_id": ObjectId(id)},
        {"$set": property.dict()}
    )
    
    if updated_result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Property not found")
        
    updated_prop = await db.properties.find_one({"_id": ObjectId(id)})
    updated_prop["_id"] = str(updated_prop["_id"])
    return updated_prop

@router.delete("/{id}")
async def delete_property(id: str):
    db = get_database()
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
        
    delete_result = await db.properties.delete_one({"_id": ObjectId(id)})
    
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Property not found")
        
    return {"message": "Property deleted successfully"}
