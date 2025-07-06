# Backend – FastAPI

## Overview
This backend manages suppliers, compliance records, AI-powered compliance analysis (using Google Gemini), and weather-based delivery justifications.

## Features
- Supplier CRUD operations
- Compliance record management
- AI-driven compliance insights (Gemini 1.5 Flash)
- Weather impact analysis for delivery delays (OpenWeatherMap)
- PostgreSQL database integration
- CORS enabled for frontend integration
- Auto-generated API docs at `/docs`

## Requirements
- Python 3.9+
- PostgreSQL
- [google-generativeai](https://pypi.org/project/google-generativeai/)
- [python-dotenv](https://pypi.org/project/python-dotenv/)
- [requests](https://pypi.org/project/requests/)
- SQLAlchemy, Pydantic, FastAPI


## Setup Instructions

1. **Clone the repository and enter the backend directory:**
cd backend
2. **Create and activate a virtual environment:**
python -m venv venv
venv\Scripts\activate
3. **Install dependencies:**
pip install -r requirements.txt
4. **Set up PostgreSQL:**
- Create a new database (e.g., `supplier_db`)
- Update your `.env` file with:
  
  DATABASE_URL=postgresql://username:password@localhost/supplier_db
  GEMINI_API_KEY=your-gemini-api-key
  OPENWEATHER_API_KEY=your-openweather-api-key
  
5. **Run database migrations (if using Alembic) or let SQLAlchemy auto-create tables.**
6. **Start the FastAPI server:**
uvicorn app.main:app --reload
7. **Access API docs at [http://localhost:8000/docs](http://localhost:8000/docs).**


## Key Endpoints

- `GET    /api/suppliers` – List all suppliers
- `POST   /api/suppliers` – Add a new supplier
- `GET    /api/suppliers/{supplier_id}` – Get supplier details
- `DELETE /api/suppliers/{supplier_id}` – Delete a supplier
- `GET    /api/suppliers/{supplier_id}/compliance` – Get compliance records for a supplier
- `POST   /api/compliance` – Add a compliance record
- `GET    /api/suppliers/insights` – Get AI-generated compliance insights (Gemini)
- `POST   /api/suppliers/check-weather-impact` – Check weather impact for delivery


## AI Integration (Gemini)
- Uses [google-generativeai](https://ai.google.dev/) to analyze compliance data and suggest improvements.
- API key required in `.env` as `GEMINI_API_KEY`.
- See `main.py` for integration details.


## Weather API Integration
- Uses [OpenWeatherMap One Call API](https://openweathermap.org/api/one-call-3) for historical weather data.
- API key required in `.env` as `OPENWEATHER_API_KEY`.


## Notes
- CORS is enabled for frontend-backend communication.
- Error handling is implemented for all endpoints.
- Inline comments in code explain key logic.
- For demo, some fields (like recent incidents/expiring contracts) are hardcoded.


## Contact

For backend issues, contact Parineeta Rana at parineeta.gcp.jam.atria@gmail.com.