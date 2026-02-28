from pydantic import BaseModel
from enum import Enum
from typing import Optional

class ContentTypeEnum(str, Enum):
    BLOG_POST = "Blog Post"
    FACEBOOK_AD = "Facebook Ad"
    COLD_EMAIL = "Cold Email"
    PRODUCT_DESCRIPTION = "Product Description"
    TWITTER_THREAD = "Twitter/X Thread"
    VIDEO_SCRIPT = "Video Script"
    SEO_ARTICLE = "SEO Article"
    INSTAGRAM_CAPTION = "Instagram Caption"
    NEWSLETTER = "Newsletter"
    STORYTELLING = "Storytelling"

class ToneEnum(str, Enum):
    PROFESSIONAL = "Professional"
    CASUAL = "Casual"
    PERSUASIVE = "Persuasive"
    EMPATHETIC = "Empathetic"
    HUMOROUS = "Humorous"
    AUTHORITATIVE = "Authoritative"

class PlatformEnum(str, Enum):
    FACEBOOK = "Facebook"
    INSTAGRAM = "Instagram"
    LINKEDIN = "LinkedIn"
    TWITTER = "Twitter/X"
    TIKTOK = "TikTok"
    GOOGLE_ADS = "Google Ads"
    EMAIL = "Email"
    BLOG = "Blog"
    YOUTUBE = "YouTube"

class ConversionGoalEnum(str, Enum):
    AWARENESS = "Awareness"
    LEAD_GENERATION = "Lead Generation"
    DIRECT_SALE = "Direct Sale"
    ENGAGEMENT = "Engagement"
    RETENTION = "Retention"

class LanguageEnum(str, Enum):
    INDONESIAN = "Bahasa Indonesia"
    ENGLISH = "English"

class PromptGenerateRequest(BaseModel):
    content_type: ContentTypeEnum
    target_audience: str
    tone: ToneEnum
    platform: PlatformEnum
    conversion_goal: ConversionGoalEnum
    output_language: LanguageEnum
    additional_context: Optional[str] = None

class PromptGenerateResponse(BaseModel):
    prompt: str
    meta: dict
    suggestions: list[str]
