from pydantic import BaseModel, Field
from typing import Optional

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class UserLog(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: Optional[str] = Field(None, alias="_id")
    hashed_password: str

    class Config:
        populate_by_name = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
