from flask import jsonify, request
from helpers import parse
from config import app, db
from models import Mood, Preference
from google import genai


with app.app_context():
    db.create_all()

client = genai.Client(api_key="AIzaSyACcNrDcX_lAWrwEdI_vrdYh39VZCYXKjg")


@app.route("/", methods=["GET"])
def fetch():
    moods = Mood.query.order_by(Mood.timestamp).all()
    return jsonify([mood.to_dict() for mood in moods])

#     return json.dumps(moods, default=lambda o: o.__dict__) doesn't work because SQLAlchemy models don’t expose their attributes as a standard Python __dict__. Instead, they use a special mapping object that prevents direct serialization using json.dumps().
            
            
@app.route("/post-mood/<string:mood>", methods=["POST"])
def post_mood(mood):
    fetched_mood = Mood(mood=mood)

    try: 
        db.session.add(fetched_mood)
        db.session.commit()

    except:
        return jsonify({"message": "Couldn't add mood"}), 404
    
    return jsonify({"message": "Successfully added mood"}), 200

@app.route("/delete/<int:id>", methods=["DELETE"])
def delete_mood(id):
    record = Mood.query.get_or_404(id)

    if not record:
        return jsonify({"message": "Mood not found"}), 404
    
    db.session.delete(record)
    db.session.commit()

    return jsonify({"message": "Mood deleted successfully"}), 200

@app.route("/preferences/<string:mood>", methods=["GET", "POST"])
def get_preferences(mood: str):
    print("im here")

    if request.method=="POST":
        data = request.get_json()

        print(data)
        for preference in data["selectedPreferences"]:
            db.session.add(Preference(mood=mood, activity=preference))

        db.session.commit()
        return jsonify({"message": "Preferences added successully"}), 200

    else:
        history = Preference.query.filter_by(mood=mood).all()
        prompt = f"Suggest 3 things to do based on 1. the mood '{mood}' and 2. my preferred activities { [h.activity for h in history] }. Suggest 2 random things based on the mood. Respond with JSON format only: {{'suggestions': [{{'activity': 'activity1', 'description': 'description for activity1'}}]}}."

        response = client.models.generate_content(
            model="gemini-2.0-flash", 
            contents=prompt  # Pass a string instead of a list
        )
        print(response.text)
        return jsonify(parse(response.text))



    


if __name__ == "__main__":
    app.run(debug=True)