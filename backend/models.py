from db import get_connection

def create_table():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            usn TEXT PRIMARY KEY,
            full_name TEXT,
            role TEXT,
            batch INTEGER,
            branch TEXT,
            email TEXT,
            phone TEXT
        )
    ''')
    conn.commit()
    conn.close()
