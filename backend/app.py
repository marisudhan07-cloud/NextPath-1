import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, JWTManager
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
app.config['DEBUG'] = True

CORS(app)

# --- DATABASE CONFIGURATION ---
db_url = os.getenv("DATABASE_URL")
if db_url and db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)
app.config['SQLALCHEMY_DATABASE_URI'] =db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# --- BCRYPT & JWT CONFIGURATION ---
bcrypt = Bcrypt(app)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

# --- DATABASE MODELS ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usn = db.Column(db.String(20), unique=True, nullable=False)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    batch = db.Column(db.String(20), nullable=True)
    branch = db.Column(db.String(50), nullable=True)
    phone = db.Column(db.String(20), nullable=True)

class PreregisteredUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usn = db.Column(db.String(20), unique=True, nullable=False)
    full_name = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    batch = db.Column(db.String(20), nullable=False)
    branch = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=True)
    phone = db.Column(db.String(20), nullable=True)

with app.app_context():
    db.create_all()
# --- AUTHENTICATION ROUTES ---
@app.route('/api/auth/verify-usn', methods=['POST'])
def verify_usn():
    data = request.get_json()
    usn = data.get('usn')
    role = data.get('role')
    preregistered_user = PreregisteredUser.query.filter_by(usn=usn, role=role).first()
    if not preregistered_user:
        return jsonify({"message": f"usn not found in the {role} records."}), 404
    existing_account = User.query.filter_by(usn=usn).first()
    if existing_account:
        return jsonify({"message": "This usn has already been registered. Please log in."}), 409
    user_details = { "fullName": preregistered_user.full_name, "batch": preregistered_user.batch, "branch": preregistered_user.branch, "email": preregistered_user.email, "phone": preregistered_user.phone }
    return jsonify({"message": "Verification successful", "user": user_details}), 200

@app.route('/api/auth/register', methods=['POST'])
def register_user():
    data = request.get_json()
    usn = data.get('usn')
    email = data.get('email')
    password = data.get('password')
    existing_user = User.query.filter((User.usn == usn) | (User.email == email)).first()
    if existing_user:
        return jsonify({"message": "This USN or email is already registered."}), 409
    preregistered_user = PreregisteredUser.query.filter_by(usn=usn).first()
    if not preregistered_user:
        return jsonify({"message": "Invalid USN. Verification failed."}), 400
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(
        usn=usn, full_name=preregistered_user.full_name, email=email,
        password_hash=hashed_password, role=preregistered_user.role,
        batch=preregistered_user.batch, branch=preregistered_user.branch,
        phone=data.get('phone')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Account created successfully! Please log in."}), 201

@app.route('/api/auth/login', methods=['POST'])
def login_user():
    data = request.get_json()
    usn = data.get('usn')
    password = data.get('password')

    if not usn or not password:
        return jsonify({"message": "USN and password are required"}), 400

    # --- NEW DEMO LOGIN LOGIC ---
    # First, check if the credentials match our hardcoded demo accounts
    if usn == 'ADM24001' and password == 'admin123':
        access_token = create_access_token(identity={'id': 0, 'role': 'admin', 'is_demo': True})
        return jsonify(token=access_token, role='admin'), 200
    if usn == 'EEE20001' and password == 'alumni123':
        access_token = create_access_token(identity={'id': -1, 'role': 'alumni', 'is_demo': True})
        return jsonify(token=access_token, role='alumni'), 200
    if usn == 'ECE25001' and password == 'student123':
        access_token = create_access_token(identity={'id': -2, 'role': 'student', 'is_demo': True})
        return jsonify(token=access_token, role='student'), 200
    # --- END OF DEMO LOGIC ---

    # If it's not a demo user, proceed with the normal database check
    user = User.query.filter_by(usn=usn).first()

    if user and bcrypt.check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity={'id': user.id, 'role': user.role})
        return jsonify(token=access_token, role=user.role), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)