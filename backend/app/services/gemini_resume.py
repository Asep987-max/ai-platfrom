import google.generativeai as genai
from app.schemas.resume import ResumeGenerateRequest
from app.config import settings

genai.configure(api_key=settings.GOOGLE_API_KEY)

async def generate_resume_content(request: ResumeGenerateRequest) -> dict:
    model = genai.GenerativeModel("gemini-1.5-pro")

    prompt = f"""
    You are an expert resume writer. Create an ATS-optimized resume for {request.full_name}
    applying for the role of {request.target_role}.

    Skills: {', '.join(request.skills)}
    Experience: {request.experience}
    Education: {request.education}

    Return a structured JSON object representing the optimized resume.
    """

    response = model.generate_content(prompt)
    # In a real app, parse JSON from response.text
    # For now, return a mock structured object
    return {
        "personal_info": {"name": request.full_name, "role": request.target_role},
        "summary": "Experienced professional with focus on AI results.",
        "skills": request.skills,
        "experience": [exp.model_dump() for exp in request.experience],
        "education": [edu.model_dump() for edu in request.education]
    }
