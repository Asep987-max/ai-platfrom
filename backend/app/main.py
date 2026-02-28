from app.routers import prompt, resume, logo
from app.config import settings

app = FastAPI(title="AI Tools API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.NEXT_PUBLIC_APP_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prompt.router, prefix="/api/prompt", tags=["Prompt"])
app.include_router(resume.router, prefix="/api/resume", tags=["Resume"])
app.include_router(logo.router, prefix="/api/logo", tags=["Logo"])

@app.get("/health")
def health_check():
    return {"status": "healthy"}
