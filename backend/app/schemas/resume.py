from pydantic import BaseModel
from typing import List, Optional

class Experience(BaseModel):
    company: str
    position: str
    duration: str
    description: List[str]

class Education(BaseModel):
    institution: str
    degree: str
    year: str

class ResumeGenerateRequest(BaseModel):
    full_name: str
    target_role: str
    skills: List[str]
    experience: List[Experience]
    education: List[Education]
    template_variant: str = "modern"

class ResumeGenerateResponse(BaseModel):
    content: dict
    status: str
