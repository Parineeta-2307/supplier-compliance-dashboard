import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file if present

class Settings:
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://username:password@localhost:5432/proacure_db")
    # OpenAI or Gemini API Key
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    # OpenWeatherMap API Key
    WEATHER_API_KEY: str = os.getenv("WEATHER_API_KEY", "")

settings = Settings()
