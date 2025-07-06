import google.generativeai as genai
import os

# Set up Gemini API key from environment variable
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_compliance_with_gemini(records: list) -> str:
    """
    Uses Gemini to analyze compliance records and generate insights.
    Args:
        records (list): List of compliance record dicts.
    Returns:
        str: AI-generated analysis and suggestions.
    """
    # Format the records for the prompt
    formatted_records = "\n".join([
        f"- {r['date_recorded']}: {r['metric']} = {r['result']} ({r['status']})"
        for r in records
    ])
    prompt = (
        "You are a compliance analysis assistant for a procurement team. "
        "Given the following supplier compliance records, identify any patterns of non-compliance "
        "and provide actionable suggestions for improving supplier performance. "
        "Categorize issues (e.g., delivery delays, quality inconsistencies) and suggest contract improvements.\n\n"
        f"Compliance Records:\n{formatted_records}\n\n"
        "Respond with a summary of issues and clear, actionable recommendations."
    )
    model = genai.GenerativeModel("gemini-1.5-flash")  # Or "gemini-1.5-pro" if available
    response = model.generate_content(prompt)
    return response.text.strip()
