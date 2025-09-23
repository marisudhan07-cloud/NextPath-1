from db import get_connection
from models import create_table

create_table()

data = [
    ("ADM24001", "Demo Admin", "admin", 2024, "Administration", "admin@example.com", "1234567890"),
    ("EEE20001", "Demo Alumni", "alumni", 2020, "Computer Science", "alumni@example.com", "1234567891"),
    ("ECE25001", "Demo Student", "student", 2025, "Mechanical", "student@example.com", "1234567892"),
    ("CSE21001", "Alice Johnson", "alumni", 2021, "Computer Science", "alice@example.com", "1112223330"),
    # Add the rest of your entries here...
    ("CSE00047", "Avery Lee", "alumni", 2025, "Civil", "avery.lee@example.com", "9990000047")
]

conn = get_connection()
cursor = conn.cursor()

cursor.executemany('''
    INSERT INTO users (usn, full_name, role, batch, branch, email, phone)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    ON CONFLICT (usn) DO NOTHING
''', data)

conn.commit()
conn.close()
print("✅ Data inserted into PostgreSQL successfully.")
