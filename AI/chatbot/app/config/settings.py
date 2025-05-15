from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):

    OPENAI_API_KEY: str
    OPENAI_API_BASE: str

    EMBEDDING_MODEL: str

    WS_HOST: str
    WS_PORT: int

    BACKEND_API_URL:str
    API_TOKEN: Optional[str] = None

    CHROMA_HOST: str
    CHROMA_PORT: int
    CHROMA_DB_PATH: str

    REDIS_HOST: str
    REDIS_PORT: int
    REDIS_DB: int
    CACHE_SECRET_KEY: str = "poketingjjangjjanghahahahaha"

    LLM_MODEL: str
    LLM_TEMPERATURE: float

    LOG_LEVEL: str

    model_config = SettingsConfigDict(
        env_file='.env',
        env_file_encoding='utf-8',
        extra="ignore"
    )

settings = Settings()