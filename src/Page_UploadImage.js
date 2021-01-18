import React, {useState} from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap';
import 'semantic-ui-css/semantic.min.css'
import './Page_UploadImage.css';
import DragDrop from './DragDrop'

function App() {
  const [myImageURL, setMyImageURL] = useState("initial")
  const [styleImageURL, setStyleImageURL] = useState("initial")

  return (
    <div class="App-container">
      <div class="ui placeholder segment">
        <div class="ui two column very relaxed stackable grid">
          {/* 첫번째  드래그앤드롭 박스 */}
          <div class="middle aligned column">
            <DragDrop setURL={setMyImageURL}/>
            <p>{myImageURL}</p>
          </div>
          {/* 두번째 드래그앤드롭 박스 */}
          <div class="middle aligned column">
            <DragDrop setURL={setStyleImageURL}/>
            <p>{styleImageURL}</p>
          </div>
        </div>
        {/* 가운데 구분선 */}
        <div class="ui vertical divider">
          PLUS
        </div>
      </div>
      {/* transfer 버튼 
          - pakage.json 파일에 ["proxy": "http://127.0.0.1:5000/",] 추가. */}
      <div class="btn_transfer">
        <button class="ui inverted button" 
          onClick = { async() => {
            const imageData = {myImage: myImageURL, styleImage: styleImageURL };
            console.log(imageData)
            // 이미지 전달
            const response = await fetch("/send_image", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(imageData)
            });
            if (response.ok) {
              console.log("response worked!");
              // 결과 받기
              fetch("/result").then(response =>
                response.json().then(data => {
                  console.log(data);
                })
              );
            }
          }}
        > Transfer </button>
      </div>
    </div>
  )
}

export default App;
