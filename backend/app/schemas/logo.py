from pydantic import BaseModel
from typing import List, Optional

class LogoGenerateRequest(BaseModel):
    company_name: str
    industry: str
    style_preference: str # e.g., "minimalist", "retro", "tech"
    color_palette: List[str]
    slogan: Optional[str] = None

class LogoConcept(BaseModel):
    id: str
    url: str
    description: str

class LogoGenerateResponse(BaseModel):
    concepts: List[LogoConcept]
    status: str
