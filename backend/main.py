from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import genai
import os

# Load environment variables
load_dotenv()

# Read Gemini API key
api_key = os.getenv("GEMINI_API_KEY")

# Create Gemini client
client = genai.Client(api_key=api_key)

# Create FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Model
class PlanRequest(BaseModel):
    goal: str
    syllabus: str
    hours: int


# Home Route
@app.get("/")
def home():
    return {"message": "Welcome to Goal2Plan AI Backend"}


# AI Route
@app.post("/generate")
def generate(data: PlanRequest):

    prompt = f"""
You are an expert AI Study Planner.

Goal:
{data.goal}

Syllabus:
{data.syllabus}

Study Hours:
{data.hours} hours/day

Generate:
1. Goal Summary
2. Learning Strategy
3. Phase-wise Learning Roadmap
4. Daily Study Plan
5. Recommendations
"""

    try:
        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=prompt,
        )

        return {
            "plan": response.text
        }

    except Exception as e:
        return {
            "error": str(e)
        }