from flask import Flask, request, redirect
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

with app.app_context():
    db.create_all()


# @app.route("/", methods=["POST"])
# def fetch():
#     return {}
    
        
@app.route("/post-mood", methods=["POST"])
def post_mood():
    print("in post method")

    
    print("in post method")
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