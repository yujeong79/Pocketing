from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):

    OPENAI_API_KEY: str

    EMBEDDING_MODEL: str

    WS_HOST: str
    WS_PORT: int

    BACKEND_API_URL:str

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

    MONGO_URI: str
    MONGO_DB_NAME: str
    MONGO_COLLECTION: str

    model_config = SettingsConfigDict(
        env_file='.env',
        env_file_encoding='utf-8',
        extra="ignore"
    )

settings = Settings()