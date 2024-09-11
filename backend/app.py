import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

from flask import Flask, render_template, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime  # Add this import
from io import BytesIO
import base64
import requests
import random

# Initialize Flask app and its configurations
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

# Enable CORS for React frontend
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False, unique=True)
    password = db.Column(db.String(150), nullable=False)

# Game Content model
class GameContent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)

# User Scores model
class UserScores(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    time_taken = db.Column(db.String(50), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

# Create all tables
with app.app_context():
    db.create_all()

# Route to predict caption
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
            generatedCaption = generate_captions_large(image)  # Assuming this function exists
            # Encode the image in base64 for display
            buffered = BytesIO()
            image.save(buffered, format="JPEG")
            image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
            image = f"data:image/jpeg;base64,{image_base64}"

    return jsonify(caption=generatedCaption, image=image)

# Signup route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(name=data['name'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully!"}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        session['user'] = user.email
        return jsonify({"message": "Login successful!"}), 200
    return jsonify({"message": "Invalid credentials!"}), 401

# Logout route
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({"message": "Logout successful!"}), 200

# Get game content route
@app.route('/api/game-content', methods=['GET'])
def get_game_content():
    try:
        # Fetch all game content
        content = GameContent.query.all()

        # Randomly select 5 pictures
        pictures = random.sample(content, 5)

        # Select 5 matching words (from the selected pictures)
        matching_words = [picture.name for picture in pictures]

        # Select 5 additional random words (that don't match the pictures)
        additional_words = random.sample([c.name for c in content if c.name not in matching_words], 5)

        # Combine the correct words and the random words (to make it 10)
        words = matching_words + additional_words
        random.shuffle(words)  # Shuffle the words

        # Prepare the response data
        game_data = {
            "pictures": [{"id": p.id, "imageUrl": p.image_url, "name": p.name} for p in pictures],
            "words": words  # Send 10 words (5 correct and 5 random)
        }

        return jsonify(game_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Save user score route
@app.route('/api/save-score', methods=['POST'])
def save_score():
    data = request.json
    user_id = data.get('userId')
    score = data.get('score')
    time_taken = data.get('timeTaken')

    if not user_id or not score or not time_taken:
        return jsonify({"error": "Invalid request data"}), 400

    try:
        new_score = UserScores(user_id=user_id, score=score, time_taken=time_taken)
        db.session.add(new_score)
        db.session.commit()
        return jsonify({"message": "Score saved successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get user scores route
@app.route('/api/user-scores', methods=['GET'])
def get_user_scores():
    user_id = request.args.get('userId')
    
    try:
        if user_id:
            scores = UserScores.query.filter_by(user_id=user_id).all()
        else:
            scores = UserScores.query.all()
        score_list = [
            {
                "userId": score.user_id,
                "score": score.score,
                "timeTaken": score.time_taken,
                "date": score.date.strftime('%Y-%m-%d')
            } for score in scores
        ]
        return jsonify({"scores": score_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
