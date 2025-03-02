import json


def parse(text:str) -> dict:
    """
    Parses the json response received from Gemini API. Refer server.py > get_preferences()
    What it does: removes formatting by Gemini.

    Parameters:
        test (str): response.text from Gemini
    
    Returns:
        a dictionary with a list of suggestions that is minimally altered by jsonify() in server.py
    """

    text = text.strip("`").lstrip("json").strip()

    # print(repr(text))
    return json.loads(text)
