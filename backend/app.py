import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

from flask import Flask, render_template, request, jsonify
from git_large_model import generate_captions_large  # Import from git_large_model.py
from PIL import Image
import requests
from io import BytesIO
import base64

app = Flask(__name__)

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

if __name__ == "__main__":
    app.run(port=3000, debug=True)
