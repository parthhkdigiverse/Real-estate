from fastapi import APIRouter, HTTPException
from typing import List
from app.db.mongodb import get_database
from app.models.inquiry import InquiryModel, InquiryResponse
from bson import ObjectId

router = APIRouter()

@router.post("/", response_model=InquiryResponse)
async def create_inquiry(inquiry: InquiryModel):
    db = get_database()
    new_inquiry = await db.inquiries.insert_one(inquiry.dict())
    created_inquiry = await db.inquiries.find_one({"_id": new_inquiry.inserted_id})
    created_inquiry["_id"] = str(created_inquiry["_id"])
    return created_inquiry

@router.get("/", response_model=List[InquiryResponse])
async def get_inquiries():
    db = get_database()
    inquiries = []
    async for inquiry in db.inquiries.find().sort("createdAt", -1):
        inquiry["_id"] = str(inquiry["_id"])
        inquiries.append(inquiry)
    return inquiries

@router.delete("/{id}")
async def delete_inquiry(id: str):
    db = get_database()
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
        
    delete_result = await db.inquiries.delete_one({"_id": ObjectId(id)})
    
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
        
    return {"message": "Inquiry deleted successfully"}
