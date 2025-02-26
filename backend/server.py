from flask import Flask, jsonify, request, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'

db = SQLAlchemy(app)

class Mood(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    timestamp: Mapped[datetime] = mapped_column(default=datetime.now)
    mood: Mapped[str] = mapped_column()
    notes: Mapped[str] = mapped_column(default="")

    def to_dict(self):
        return {"id": self.id, "mood": self.mood, "timestamp": self.timestamp.isoformat(), "notes": self.notes}

with app.app_context():
    db.create_all()


@app.route("/", methods=["GET"])
def fetch():
    moods = Mood.query.order_by(Mood.timestamp).all()
    return jsonify([mood.to_dict() for mood in moods])

#     return json.dumps(moods, default=lambda o: o.__dict__) doesn't work because SQLAlchemy models don’t expose their attributes as a standard Python __dict__. Instead, they use a special mapping object that prevents direct serialization using json.dumps().
            
            
@app.route("/post-mood", methods=["POST"])
def post_mood():
    data = request.get_json()
    fetched_mood = Mood(mood=data["mood"])

    try: 
        db.session.add(fetched_mood)
        db.session.commit()
    except:
        return "Couldn't add mood"
    
    return {}



    


if __name__ == "__main__":
    app.run(debug=True)