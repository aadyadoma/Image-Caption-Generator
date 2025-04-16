from flask import Flask, request, jsonify, Response
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import io
from flask_cors import CORS



app = Flask(__name__)
CORS(app)
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

@app.route("/caption", methods=["POST"])
def caption():
    file = request.files['image']
    image = Image.open(io.BytesIO(file.read())).convert("RGB")
    
    inputs = processor(images=image, return_tensors="pt")
    out = model.generate(**inputs)
    caption = processor.decode(out[0], skip_special_tokens=True)
    
    return jsonify({"caption": caption})
    # print("received request")
    # return "This is a test caption"
    # return jsonify({"caption": "meow"})



if __name__ == "__main__":
    # app.run(debug=True)
    app.run(debug=False, use_reloader=False)

