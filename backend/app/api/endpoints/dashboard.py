from fastapi import APIRouter
from app.db.mongodb import get_database
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/stats")
async def get_dashboard_stats():
    db = get_database()
    
    # 1. Total Counts
    property_count = await db.properties.count_documents({})
    inquiry_count = await db.inquiries.count_documents({})
    
    # 2. Recent Inquiries (last 5)
    recent_inquiries = []
    async for inquiry in db.inquiries.find().sort("createdAt", -1).limit(5):
        inquiry["_id"] = str(inquiry["_id"])
        # Format datetime for JSON response
        if isinstance(inquiry.get("createdAt"), datetime):
            inquiry["createdAt"] = inquiry["createdAt"].isoformat()
        recent_inquiries.append(inquiry)
        
    # 3. Monthly Inquiry Trends (Simple mock or real aggregation)
    # For now, let's provide count for last 7 days to keep it simple but useful
    trends = []
    now = datetime.utcnow()
    for i in range(6, -1, -1):
        day = now - timedelta(days=i)
        start_of_day = datetime(day.year, day.month, day.day)
        end_of_day = start_of_day + timedelta(days=1)
        
        count = await db.inquiries.count_documents({
            "createdAt": {
                "$gte": start_of_day,
                "$lt": end_of_day
            }
        })
        trends.append({
            "date": day.strftime("%Y-%m-%d"),
            "count": count
        })

    return {
        "totalProperties": property_count,
        "totalInquiries": inquiry_count,
        "recentInquiries": recent_inquiries,
        "trends": trends
    }
