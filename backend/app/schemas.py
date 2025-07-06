from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import date

class SupplierBase(BaseModel):
    name: str
    country: str
    compliance_score: int
    contract_terms: Dict
    last_audit: date

class SupplierCreate(SupplierBase):
    pass

class SupplierOut(SupplierBase):
    supplier_id: int
    class Config:
        from_attributes = True


class ComplianceRecordBase(BaseModel):
    metric: str
    date_recorded: date
    result: str
    status: str

class ComplianceRecordCreate(ComplianceRecordBase):
    supplier_id: int

class ComplianceRecordOut(ComplianceRecordBase):
    compliance_record_id: int
    supplier_id: int
    class Config:
        from_attributes = True

class WeatherImpactRequest(BaseModel):
    supplier_id: int
    latitude: float
    longitude: float
    delivery_date: str