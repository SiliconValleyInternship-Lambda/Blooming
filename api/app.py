from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return "hello world"

@app.route('/send_image', methods=['POST', 'GET'])
def send_image():
    if request.method == 'POST':
        # 이미지url을 받는다.
        image_data = request.get_json()
        myImageURL = image_data['myImage']
        styleImageURL = image_data['styleImage']

        # # 모델 실행
        # import styleTransfer as sf
        # result = ""
        # result = sf.predict(myImageURL, styleImageURL)
        # return result
        return ""
    else:
        return ""

@app.route('/result')
def result():
    res = "test result"
    return jsonify({"result": res})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000', debug=True) # 이 부분이 안먹힘. 이유는 모름.