from fastapi import APIRouter, HTTPException
from app.schemas.resume import ResumeGenerateRequest, ResumeGenerateResponse
from app.services.gemini_resume import generate_resume_content
from app.services.pdf_export import export_to_pdf

router = APIRouter()

@router.post("/generate", response_model=ResumeGenerateResponse)
async def generate_resume(request: ResumeGenerateRequest):
    try:
        content = await generate_resume_content(request)
        return ResumeGenerateResponse(
            content=content,
            status="success"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/export/pdf")
async def export_pdf(request: ResumeGenerateResponse):
    try:
        pdf_url = await export_to_pdf(request.content)
        return {"url": pdf_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
