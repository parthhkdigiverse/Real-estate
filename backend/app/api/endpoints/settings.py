from fastapi import APIRouter, HTTPException, Depends
from app.db.mongodb import get_database
from app.models.settings import SiteSettingsModel, SiteSettingsResponse
from app.api.endpoints.auth import get_current_user
from typing import Optional

router = APIRouter()

DEFAULT_SETTINGS = {
    "phone": "0203 757 2828",
    "email": "SunningdaleNewHomes@savills.com",
    "address": "The Sandars, Coldharbour Lane, Egham, Surrey, TW20 8TD",
    "instagram": "#",
    "facebook": "#",
    "linkedin": "#"
}

@router.get("", response_model=SiteSettingsResponse)
async def get_settings():
    db = get_database()
    settings = await db.settings.find_one({})
    
    if not settings:
        # Initialize with defaults if empty
        new_settings = await db.settings.insert_one(DEFAULT_SETTINGS)
        settings = await db.settings.find_one({"_id": new_settings.inserted_id})
    
    settings["_id"] = str(settings["_id"])
    return settings

@router.put("", response_model=SiteSettingsResponse)
async def update_settings(settings_in: SiteSettingsModel, current_user: str = Depends(get_current_user)):
    db = get_database()
    
    # We only ever have one settings document
    existing = await db.settings.find_one({})
    
    if existing:
        await db.settings.update_one(
            {"_id": existing["_id"]},
            {"$set": settings_in.dict()}
        )
        updated = await db.settings.find_one({"_id": existing["_id"]})
    else:
        new_result = await db.settings.insert_one(settings_in.dict())
        updated = await db.settings.find_one({"_id": new_result.inserted_id})
        
    updated["_id"] = str(updated["_id"])
    return updated
