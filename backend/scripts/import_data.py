import pandas as pd
from sqlalchemy import create_engine
import json
import sys
import os

# Adjust the path to import config
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'app')))
from config import settings

# File paths
SUPPLIER_FILE = "../data/Task_Supplier_Data.xlsx"
COMPLIANCE_FILE = "../data/Task_Compliance_Records.xlsx"

# Connect to PostgreSQL
engine = create_engine(settings.DATABASE_URL)

# Import suppliers
df_suppliers = pd.read_excel(SUPPLIER_FILE)
# Convert contract_terms from string to JSON if needed
if df_suppliers['contract_terms'].dtype == object:
    df_suppliers['contract_terms'] = df_suppliers['contract_terms'].apply(
        lambda x: json.loads(x.replace("'", '"')) if isinstance(x, str) else x
    )
df_suppliers.to_sql('suppliers', engine, if_exists='append', index=False)

# Import compliance records
df_compliance = pd.read_excel(COMPLIANCE_FILE)
df_compliance.to_sql('compliance_records', engine, if_exists='append', index=False)

print("Data import complete.")
