from fastapi import APIRouter, HTTPException
import os
from typing import List

router = APIRouter()

# Path to the frontend public assets folder relative to the backend app root
# Root/backend/app/api/endpoints/assets.py -> Root/frontend/public/assets
ASSETS_DIR = os.path.join(os.path.dirname(__file__), "../../../../frontend/public/assets")

@router.get("/", response_model=List[str])
async def list_assets():
    if not os.path.exists(ASSETS_DIR):
        print(f"ERROR: Assets directory not found at {ASSETS_DIR}")
        return []
        
    try:
        # Get all image files from the directory
        files = [
            f for f in os.listdir(ASSETS_DIR) 
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'))
        ]
        # Return the public web paths
        return [f"/assets/{f}" for f in files]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
