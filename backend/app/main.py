import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import requests
from dotenv import load_dotenv
import google.generativeai as genai
from .schemas import WeatherImpactRequest

from .database import SessionLocal, engine
from . import models, schemas, crud

# Create tables
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(title="Supplier Compliance Monitor")

# Allow CORS (for frontend-backend communication)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update to ["http://localhost:3000"] for frontend dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load .env variables (make sure you have GEMINI_API_KEY and OPENWEATHER_API_KEY in your .env file)
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ----- Insights Endpoint with Gemini Integration -----
@app.get("/api/suppliers/insights")
def get_compliance_insights(db: Session = Depends(get_db)):
    suppliers = db.query(models.Supplier).all()
    total = len(suppliers)
    if total == 0:
        compliance_summary = {
            "compliance_rate": 0,
            "non_compliant": 0,
            "average_score": 0,
            "recent_incidents": 0,
            "expiring_contracts": 0,
            "total_suppliers": 0
        }
    else:
        compliant = [s for s in suppliers if s.compliance_score >= 12]
        compliance_rate = round(len(compliant) / total * 100, 2)
        non_compliant = total - len(compliant)
        average_score = round(sum([s.compliance_score for s in suppliers]) / total, 2)
        recent_incidents = 0  # Hardcoded for demo
        expiring_contracts = 0  # Hardcoded for demo
        compliance_summary = {
            "compliance_rate": compliance_rate,
            "non_compliant": non_compliant,
            "average_score": average_score,
            "recent_incidents": recent_incidents,
            "expiring_contracts": expiring_contracts,
            "total_suppliers": total
        }

    prompt = (
        f"Supplier compliance summary: {compliance_summary}. "
        "Suggest two actionable steps to improve supplier compliance."
    )
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")  # or "gemini-pro"
        response = model.generate_content(prompt)
        ai_suggestion = response.text
    except Exception as e:
        print("Gemini API error:", e)  # Debug print
        ai_suggestion = "AI suggestion unavailable."

    return {
        **compliance_summary,
        "ai_suggestion": ai_suggestion
    }

# ----- Supplier Endpoints -----
@app.delete("/api/suppliers/{supplier_id}")
def delete_supplier(supplier_id: int, db: Session = Depends(get_db)):
    supplier = db.query(models.Supplier).filter(models.Supplier.supplier_id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    db.delete(supplier)
    db.commit()
    return {"message": "Supplier deleted"}

@app.get("/api/suppliers", response_model=List[schemas.SupplierOut])
def get_suppliers(db: Session = Depends(get_db)):
    return crud.get_suppliers(db)

@app.get("/api/suppliers/{supplier_id}", response_model=schemas.SupplierOut)
def get_supplier(supplier_id: int, db: Session = Depends(get_db)):
    supplier = crud.get_supplier(db, supplier_id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier

@app.post("/api/suppliers", response_model=schemas.SupplierOut)
def create_supplier(supplier: schemas.SupplierCreate, db: Session = Depends(get_db)):
    return crud.create_supplier(db, supplier)

# ----- Compliance Endpoints -----
@app.get("/api/suppliers/{supplier_id}/compliance", response_model=List[schemas.ComplianceRecordOut])
def get_compliance_for_supplier(supplier_id: int, db: Session = Depends(get_db)):
    return crud.get_compliance_records(db, supplier_id)

@app.post("/api/compliance", response_model=schemas.ComplianceRecordOut)
def create_compliance_record(record: schemas.ComplianceRecordCreate, db: Session = Depends(get_db)):
    return crud.create_compliance_record(db, record)

# ----- Weather API Bonus Endpoint -----
@app.post("/api/suppliers/check-weather-impact")
def check_weather_impact(
    req: WeatherImpactRequest,
    db: Session = Depends(get_db)
):
    supplier_id = req.supplier_id
    latitude = req.latitude
    longitude = req.longitude
    delivery_date = req.delivery_date
    """
    Checks weather for a given date/location and updates compliance record if adverse weather found.
    """
    from datetime import datetime
    dt_obj = datetime.strptime(delivery_date, "%Y-%m-%d")
    unix_time = int(dt_obj.timestamp())

    api_key = os.getenv("OPENWEATHER_API_KEY")
    url = (
        f"https://api.openweathermap.org/data/3.0/onecall/timemachine"
        f"?lat={latitude}&lon={longitude}&dt={unix_time}&appid={api_key}"
    )
    try:
        resp = requests.get(url)
        data = resp.json()
        # Check for adverse weather: rain, snow, thunderstorm
        adverse = False
        details = ""
        for hour in data.get("data", []):
            weather = hour.get("weather", [{}])[0].get("main", "").lower()
            if weather in ["rain", "snow", "thunderstorm"]:
                adverse = True
                details = weather
                break

        # Update compliance record if adverse weather
        if adverse:
            # Find latest compliance record for this supplier and date
            record = (
                db.query(models.ComplianceRecord)
                .filter(models.ComplianceRecord.supplier_id == supplier_id)
                .filter(models.ComplianceRecord.date_recorded == delivery_date)
                .first()
            )
            if record:
                record.status = "Excused - Weather Delay"
                db.commit()
                return {"excused": True, "reason": details, "message": "Marked as Excused - Weather Delay."}
            else:
                return {"excused": True, "reason": details, "message": "Adverse weather found, but no matching compliance record."}
        else:
            return {"excused": False, "message": "No adverse weather detected."}
    except Exception as e:
        print("Weather API error:", e)
        return {"error": str(e)}

# ----- Root -----
@app.get("/")
def root():
    return {"message": "Supplier Compliance Backend Running!"}
