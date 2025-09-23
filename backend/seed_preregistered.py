from app import db, PreregisteredUser

# List of tuples: (usn, full_name, role, batch, branch, email, phone)
data = [
    ("ADM24001", "Demo Admin", "admin", "2024", "Administration", "admin@example.com", "1234567890"),
    ("EEE20001", "Demo Alumni", "alumni", "2020", "Computer Science", "alumni@example.com", "1234567891"),
    ("ECE25001", "Demo Student", "student", "2025", "Mechanical", "student@example.com", "1234567892"),
    ("CSE21001", "Alice Johnson", "alumni", "2021", "Computer Science", "alice@example.com", "1112223330"),
    # ... continue with the rest of your entries
    ("CSE00047", "Avery Lee", "alumni", "2025", "Civil", "avery.lee@example.com", "9990000047")
]

with db.session.begin():
    for entry in data:
        user = PreregisteredUser(
            usn=entry[0],
            full_name=entry[1],
            role=entry[2],
            batch=entry[3],
            branch=entry[4],
            email=entry[5],
            phone=entry[6]
        )
        db.session.merge(user)  # merge avoids duplicates based on primary key

print("✅ Preregistered users seeded successfully.")
