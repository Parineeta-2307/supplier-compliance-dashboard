import psycopg2

conn = psycopg2.connect(
    dbname="proacure_db",
    user="postgres",
    password="parineeta",
    host="localhost",
    port=5432
)
print("Connected successfully!")
conn.close()
