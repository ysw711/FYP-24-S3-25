import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

from flask import Flask, render_template, request, jsonify, session
# from git_large_model import generate_captions_large  # Import from git_large_model.py
# from PIL import Image
# import requests
# from io import BytesIO
# import base64
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

CORS(app, origins=["http://localhost:3000"], supports_credentials=True)  # Enable CORS for React frontend

@app.route('/', methods=['GET', 'POST'])
def predictCaption():
    generatedCaption = None
    image = None

    if request.method == 'POST':
        data = request.get_json()  # Expect JSON data
        imageFile = data.get('imageFile')
        image_url = data.get('imageURL')

        if imageFile:
            # Decode the base64 string to image
            image_data = base64.b64decode(imageFile)
            image = Image.open(BytesIO(image_data))
        elif image_url:
            response = requests.get(image_url)
            image = Image.open(BytesIO(response.content))

        # Generate caption for the image
        if image:
            generatedCaption = generate_captions_large(image)
            # Encode the image in base64 for display
            buffered = BytesIO()
            image.save(buffered, format="JPEG")
            image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
            image = f"data:image/jpeg;base64,{image_base64}"

    return jsonify(caption=generatedCaption, image=image)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False, unique=True)
    password = db.Column(db.String(150), nullable=False)

# Create DB
with app.app_context():
    db.create_all()

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
