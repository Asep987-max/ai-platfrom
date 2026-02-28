import google.generativeai as genai
from app.schemas.prompt import PromptGenerateRequest
from app.config import settings

genai.configure(api_key=settings.GOOGLE_API_KEY)

async def generate_prompt_content(request: PromptGenerateRequest) -> tuple[str, list[str]]:
    model = genai.GenerativeModel("gemini-1.5-pro")
    
    system_prompt = f"""
    You are an expert prompt engineer. Your task is to generate a high-quality, effective prompt for {request.platform} 
    targeting an audience of {request.target_audience}. 
    The content type is {request.content_type} with a {request.tone} tone.
    The primary goal is {request.conversion_goal}.
    Language: {request.output_language}
    """
    
    if request.additional_context:
        system_prompt += f"\nAdditional Context: {request.additional_context}"
    
    user_input = "Generate a structured prompt that the user can copy and paste into an AI tool."
    
    response = model.generate_content(system_prompt + "\n" + user_input)
    content = response.text
    
    # Simple logic for variations/suggestions
    suggestions = [
        "Make it more urgent",
        "Add more storytelling",
        "Focus on social proof"
    ]
    
    return content, suggestions
