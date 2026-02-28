from fastapi import APIRouter, HTTPException
from app.schemas.logo import LogoGenerateRequest, LogoGenerateResponse
from app.services.imagen_logo import generate_logo_concepts

router = APIRouter()

@router.post("/generate", response_model=LogoGenerateResponse)
async def generate_logo(request: LogoGenerateRequest):
    try:
        concepts = await generate_logo_concepts(request)
        return LogoGenerateResponse(
            concepts=concepts,
            status="success"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
