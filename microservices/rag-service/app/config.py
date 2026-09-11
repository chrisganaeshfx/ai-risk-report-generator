import os

from dotenv import load_dotenv

load_dotenv()

# The LLM provider is config-swappable — never hardcode "anthropic" or
# "gemini" in application code.
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "anthropic")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
