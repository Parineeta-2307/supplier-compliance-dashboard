from sqlalchemy.orm import Session
from . import models, schemas

# Supplier CRUD
def get_suppliers(db: Session):
    return db.query(models.Supplier).all()

def get_supplier(db: Session, supplier_id: int):
    return db.query(models.Supplier).filter(models.Supplier.supplier_id == supplier_id).first()

def create_supplier(db: Session, supplier: schemas.SupplierCreate):
    db_supplier = models.Supplier(**supplier.dict())
    db.add(db_supplier)
    db.commit()
    db.refresh(db_supplier)
    return db_supplier

# Compliance Record CRUD
def get_compliance_records(db: Session, supplier_id: int):
    return db.query(models.ComplianceRecord).filter(models.ComplianceRecord.supplier_id == supplier_id).all()

def create_compliance_record(db: Session, record: schemas.ComplianceRecordCreate):
    db_record = models.ComplianceRecord(**record.dict())
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record
