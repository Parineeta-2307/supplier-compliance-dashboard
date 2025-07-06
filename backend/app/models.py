from sqlalchemy import Column, Integer, String, Date, JSON, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Supplier(Base):
    __tablename__ = "suppliers"
    supplier_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    country = Column(String, nullable=False)
    compliance_score = Column(Integer, nullable=False)
    contract_terms = Column(JSON, nullable=False)
    last_audit = Column(Date, nullable=False)
    compliance_records = relationship("ComplianceRecord", back_populates="supplier")

class ComplianceRecord(Base):
    __tablename__ = "compliance_records"
    compliance_record_id = Column(Integer, primary_key=True, index=True)
    supplier_id = Column(Integer, ForeignKey("suppliers.supplier_id"))
    metric = Column(String, nullable=False)
    date_recorded = Column(Date, nullable=False)
    result = Column(String, nullable=False)
    status = Column(String, nullable=False)
    supplier = relationship("Supplier", back_populates="compliance_records")
