from fastapi import APIRouter, HTTPException
from app.schemas.prompt import PromptGenerateRequest, PromptGenerateResponse
from app.services.gemini_text import generate_prompt_content

router = APIRouter()

@router.post("/generate", response_model=PromptGenerateResponse)
async def generate_prompt(request: PromptGenerateRequest):
    try:
        content, suggestions = await generate_prompt_content(request)
        return PromptGenerateResponse(
            prompt=content,
            meta={
                "model": "gemini-1.5-pro",
                "timestamp": "2026-02-28T15:00:00Z" # In a real app, use dynamic timestamp
            },
            suggestions=suggestions
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
