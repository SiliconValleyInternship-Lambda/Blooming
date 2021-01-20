from flask import Flask, request, jsonify
from PIL import Image
import io

app = Flask(__name__)

@app.route('/')
def hello():
    return "hello world"

@app.route('/send_image', methods=['POST', 'GET'])
def send_image():
    if request.method == "POST":
        if request.files.get("myImage") and request.files.get("styleImage") :
            myImage = request.files["myImage"].read()
            myImage = Image.open(io.BytesIO(myImage)).convert('RGB')
            styleImage = request.files["styleImage"].read()
            styleImage = Image.open(io.BytesIO(styleImage)).convert('RGB')

            # [DEBUG] show image
            print("here ok~")
            myImage.show()
            styleImage.show()

            # 모델 실행
            # import styleTransfer as sf
            # result = ""
            # sf.predict(myImageFile, styleImageFile)
            # result = sf.main(myImage, styleImage)
            return jsonify({"result": "get image ok!!!!"})
        else:
            return jsonify({"result": "failed to get image"})
    else:
        return "not post mode"

if __name__ == "__main__":
    app.run(host='127.0.0.1', port='5000', debug=True) # 이 부분이 안먹힘. 이유는 모름.