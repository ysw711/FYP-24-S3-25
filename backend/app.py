from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from  flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class User(db.Model):
    userId = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    email = db.Column(db.String(100))

    def __init__(self, username, email):
        self.username = username  # Changed from `title` to `username`
        self.email = email

class UserSchema(ma.Schema):
    class Meta:
        fields = ('userId', 'username', 'email')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

@app.route('/get', methods=['GET'])
def get_articles():
    all_users = User.query.all()
    results = users_schema.dump(all_users)
    return jsonify(results)
 
@app.route('/get/<userId>/', methods=['GET'])
def post_details(userId):
    user = User.query.get(userId)
    return user_schema.jsonify(user)


@app.route('/add', methods=['POST'])
def add_articles():
    username = request.json['username']
    email = request.json['email']

    users = User(username, email)
    db.session.add(users)
    db.session.commit()
    return user_schema.jsonify(users)

@app.route('/update/<userId>/', methods=['PUT'])
def update_article(userId):
    user = User.query.get(userId)

    username = request.json['username']
    email = request.json['email']

    user.username = username
    user.email = email

    db.session.commit()
    return user_schema.jsonify(user)

@app.route('/delete/<userId>/', methods=['DELETE'])
def user_delete(userId):
    user = User.query.get(userId)
    db.session.delete(user)
    db.session.commit()

    return user_schema.jsonify(user)

if __name__ == "__main__":
    app.run(debug=True)
