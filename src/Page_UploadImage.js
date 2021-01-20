import React, {useState} from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap';
import 'semantic-ui-css/semantic.min.css'
import './Page_UploadImage.css';
import DragDrop from './DragDrop'
import axios from 'axios'; 

function Page_UploadImage() {
  const [myImage, setMyImage] = useState(null)
  const [styleImage, setStyleImage] = useState(null)

  return (
    <div class="App-container">
      <div class="ui placeholder segment">
        <div class="ui two column very relaxed stackable grid">
          {/* dropzone */}
          <div class="middle aligned column">
            <DragDrop setImage={setMyImage}/>
          </div>
          <div class="middle aligned column">
            <DragDrop setImage={setStyleImage}/>
          </div>
        </div>
        <div class="ui vertical divider">
          PLUS
        </div>
      </div>
      {/* transfer 버튼 
          - pakage.json 파일에 ["proxy": "http://127.0.0.1:5000/",] 추가. */}
      <div class="btn_transfer">
        <button class="ui inverted button" 
          onClick = { async() => {
            const formData = new FormData();
            formData.append("myImage", myImage);
            formData.append("styleImage", styleImage);
            checkFormData(formData); // [DEBUG] 보낼 데이터를 console에 보여줌
            // 이미지 전달
            try {
              const response = await axios.post("/send_image", formData, {
                header: {
                  "content-type": "multipart/form-data",
                },
              });
              console.log(response.data);
            } catch(error) {
              console.log(error);
            }
          }}
        > Transfer </button>
      </div>
    </div>
  )
}

// [DEBUG]
function checkFormData (formData) {
  for (let key of formData.keys()) {
    console.log(key); // FormData의 key 확인
  }
  for (let value of formData.values()) {
    console.log(value); // FormData의 value 확인
  }
}

export default Page_UploadImage;
