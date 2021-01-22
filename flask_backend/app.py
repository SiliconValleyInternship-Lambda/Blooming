import tensorflow_hub as hub
from flask import Flask
from flask import request
from flask import send_file
from flask import jsonify
import tensorflow as tf
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
import numpy as np
import io

##########모델 로드

base_model = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')

placeholder = tf.keras.layers.Input(shape=(None, None, 3), dtype=tf.float32)
placeholder_1 = tf.keras.layers.Input(shape=(None, None, 3), dtype=tf.float32)
net = hub.KerasLayer(base_model, signature='serving_default', signature_outputs_as_dict=True)({'placeholder': placeholder, 'placeholder_1': placeholder_1})
model = tf.keras.models.Model({'placeholder': placeholder, 'placeholder_1': placeholder_1}, net)

##########모델 예측

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello World"
#     html = '''
# <html>
# <head>
#     <title>스타일 변환</title>
# </head>
# <body>
#     <center>
#     스타일 변환<br>
#     <form action="/predict" method="post" enctype="multipart/form-data">
#         이미지 파일 <input type="file" name="file"><br>
#         <input type="submit" value="변환">
#     </form>
#     </center>
# </body>
# </html>
# '''

#     return html
    

@app.route('/send_image', methods=['POST', 'GET'])
def send_image():
    if request.method == "POST":
        if request.files.get("myImage") and request.files.get("styleImage") :
            image = request.files["myImage"].read()
            image = Image.open(io.BytesIO(image)).convert('RGB')
            # image.show()
            width, height = image.size
            image_numpy = np.array(image)
            x_test = np.array([image_numpy])
            x_test = x_test / 255
            content_image = x_test

            image = request.files["styleImage"].read()
            image = Image.open(io.BytesIO(image)).convert('RGB')
            # image.show()
            image = image.resize((width, height))
            image_numpy = np.array(image)
            x_test = np.array([image_numpy])
            x_test = x_test / 255
            style_image = x_test

            dict_outut = model.predict({'placeholder': content_image, 'placeholder_1': style_image})

            y_predict = dict_outut['output_0']
            numpy_image = y_predict[0]
            numpy_image = (numpy_image * 255).astype(np.uint8)
            image = Image.fromarray(numpy_image)
            bytesIO = io.BytesIO()
            image.save(bytesIO, 'JPEG', quality=70)
            bytesIO.seek(0)
            image.show()
            
            return send_file(bytesIO, mimetype='image/jpeg')
            # return jsonify({"result": "test mode"})
        else:
            return jsonify({"result": "failed to get image"})
    else:
        return "not post mode"

app.run(host='127.0.0.1', port=5000, debug=False)
