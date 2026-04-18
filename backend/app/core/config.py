import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "The Sandras API"
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb+srv://HK_Digiverse:HK%40Digiverse%40123@cluster0.lcbyqbq.mongodb.net/the_sandras?retryWrites=true&w=majority&appName=Cluster0")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "the_sandras")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "b3d9d3f8e5a7c4d1b8e9a2c3d4f5e6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours

settings = Settings()
