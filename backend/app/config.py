from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    GOOGLE_API_KEY: str = Field(..., env="GOOGLE_API_KEY")
    DATABASE_URL: str = Field(..., env="DATABASE_URL")
    NEXT_PUBLIC_APP_URL: str = "http://localhost:3000"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
