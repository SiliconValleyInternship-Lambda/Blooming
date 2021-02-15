import tensorflow_hub as hub
from flask import Flask, request, send_file, jsonify
import tensorflow as tf
from PIL import Image, ImageDraw, ImageFont
import numpy as np
import io
import json

########## load model

base_model = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')

placeholder = tf.keras.layers.Input(shape=(None, None, 3), dtype=tf.float32)
placeholder_1 = tf.keras.layers.Input(shape=(None, None, 3), dtype=tf.float32)
net = hub.KerasLayer(base_model, signature='serving_default', signature_outputs_as_dict=True)({'placeholder': placeholder, 'placeholder_1': placeholder_1})
model = tf.keras.models.Model({'placeholder': placeholder, 'placeholder_1': placeholder_1}, net)

########## model predict

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello World"    

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
            # image.show() # [DEBUG]
            
            return send_file(bytesIO, mimetype='image/jpeg')
        else:
            return jsonify({"result": "error - failed to get the image"})
    else:
        return "hello world"

@app.route('/save_image', methods=['POST', 'GET'])
def save_image():
    if request.method == "POST":
        success = False
        image_data = request.get_json()
        author = image_data['author']
        name = image_data['name']
        src = image_data['url']
        date = datetime()

        sql = f"INSERT INTO trans_images (author, name, src, date) VALUES('{author}', '{name}', '{src}', '{date}');"
        success = conn_db(sql, "insert")
        return jsonify({"success": success})
    else:
        return "hello world"

@app.route('/get_album', methods=['POST', 'GET'])
def get_album():
    if request.method == "GET": 
        sql = "SELECT id, author, name, src FROM trans_images;"
        data = conn_db(sql, "select")
        return json.dumps(data)
    else:
        return "hello world"


def conn_db(sql, sql_type):
    import pymysql

    conn = pymysql.connect(host='', user='', password='', db='') # host(=서버주소), user, password, db 적어야함!!
    curs = conn.cursor(pymysql.cursors.DictCursor)
    curs.execute(sql)
    if sql_type == "insert":
        conn.commit()
        conn.close()
        return True
    elif sql_type == "select":
        rows = curs.fetchall()
        conn.close()
        return rows

    return False

def datetime():
    import datetime
    now = datetime.datetime.now()
    return now.strftime('%Y%m%d%H%M%S')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
