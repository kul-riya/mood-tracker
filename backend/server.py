from flask import Flask, jsonify, request, redirect
from config import app, db
from models import Mood


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
        return jsonify({"message": "Couldn't add mood"}), 404
    
    return {}

@app.route("/delete/<int:id>", methods=["DELETE"])
def delete_mood(id):
    record = Mood.query.get_or_404(id)

    if not record:
        return jsonify({"message": "User not found"}), 404
    
    db.session.delete(record)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200


    


if __name__ == "__main__":
    app.run(debug=True)