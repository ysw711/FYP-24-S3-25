import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

from flask import Flask, render_template, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

CORS(app, origins=["http://localhost:3000"], supports_credentials=True)  # Enable CORS for React frontend

# User model
# User model with parent-child relationship
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False, unique=True)
    password = db.Column(db.String(150), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # Parent ID

    # Define relationship
    children = db.relationship('User', backref=db.backref('parent', remote_side=[id]), lazy=True)


# Create DB
with app.app_context():
    db.create_all()

# Fetch all users (for user list)
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = [user.name for user in users]
    return jsonify(user_list), 200

# Add new user (for user list)
@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    user_name = data['name']

    # Check if the user already exists
    if User.query.filter_by(name=user_name).first():
        return jsonify({"message": "Username already exists"}), 400

    # Create new user
    new_user = User(name=user_name, email=f"{user_name}@example.com", password='default')
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User added successfully!"}), 201

# Signup Route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(name=data['name'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully!"}), 201

# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        session['user'] = user.email
        return jsonify({"message": "Login successful!"}), 200
    return jsonify({"message": "Invalid credentials!"}), 401

# Logout Route
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({"message": "Logout successful!"}), 200

if __name__ == "__main__":
    app.run(port=5000, debug=True)

# Add new child profile for the logged-in parent
@app.route('/add_child_profile', methods=['POST'])
def add_child_profile():
    if 'user' not in session:
        return jsonify({"message": "Login required!"}), 401

    data = request.get_json()
    user_name = data['name']
    parent_email = session['user']  # Get the logged-in parent's email

    parent = User.query.filter_by(email=parent_email).first()

    # Check if the child name already exists under this parent
    if User.query.filter_by(name=user_name, parent_id=parent.id).first():
        return jsonify({"message": "Child profile already exists"}), 400

    # Create the child profile
    new_child = User(name=user_name, email=f"{user_name}@example.com", password='default', parent_id=parent.id)
    db.session.add(new_child)
    db.session.commit()

    return jsonify({"message": "Child profile added successfully!"}), 201


