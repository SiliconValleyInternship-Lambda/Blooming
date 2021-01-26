import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap';
import "semantic-ui-css/semantic.min.css";
import "./Page_UploadImage.css";
import DragDrop from "./DragDrop";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/core";
import NavigationBar from "./NavigationBar"

function Page_UploadImage({history}) {
  const [myImage, setMyImage] = useState(null);
  const [styleImage, setStyleImage] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const [resultState, setResultState] = useState(null);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #ffffff;
  `;

  const clickSubmit = async () => {
    if(resultState == null) { // Transfer
      if (myImage == null || styleImage == null) {
        alert("이미지를 입력해주세요.");
        return "";
      }
  
      setLoadingState(true);
      const formData = new FormData();
      formData.append("myImage", myImage);
      formData.append("styleImage", styleImage);
      checkFormData(formData); // [DEBUG] 보낼 데이터를 console에 보여줌
  
      // 이미지 전송
      let response = null;
      try {
        response = await axios
          .post("/send_image", formData, {
            header: {
              "content-type": "multipart/form-data",
            },
            responseType: "arraybuffer",
          })
          .then(response => { 
            // 변환된 이미지 받음
            const prefix =
              "data:" + response.headers["content-type"] + ";base64,";
            const file = Buffer.from(response.data, "binary").toString("base64");
            return prefix + file;
          });
      } catch (error) {
        console.log(error);
      }
  
      // 이미지 전송 및 변환 성공
      if (response) {
        console.log(response);
        setLoadingState(false);
        setResultState(response);
        setMyImage(null);
        setStyleImage(null);
        document.getElementById("submitBtn").innerHTML = "Save";
      }
    }
    else { // Save
      // .. 입력폼 ..

      // 이미지 정보 보냄
      const imageData = {
        author: "test",
        name: "test image",
        url: resultState
      }
      try {
        const resp = await axios
        .post("/save_image", {
          author: "test",
          name: "test image",
          url: resultState
        }, {
          header: {
            "content-type": "application/json",
          },
        })
        .then(response => { 
          // db 저장 성공
          console.log(JSON.stringify(response.data));
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <NavigationBar history={history} icon={"home"} pageName={"TRANSFER IMAGE"} content={
      <div className="App-container">
        <div className="ui placeholder segment">
          {!loadingState && !resultState ? (
            // drop-zone
            <div>
              <div className="ui two column very relaxed stackable grid">
                <div className="middle aligned column">
                  <DragDrop setImage={setMyImage} />
                </div>
                <div className="middle aligned column">
                  <DragDrop setImage={setStyleImage} />
                </div>
              </div>
              <div className="ui vertical divider">PLUS</div>
            </div>
          ) : loadingState ? (
            // loading
            <PropagateLoader
              css={override}
              size={25}
              color={"#00b5ad"}
              loading={loadingState}
            />
          ) : (
            // show transfered image
              <div className="product">
                  <img src= {resultState} alt="result" className="img_result" />
              </div>
          )}
        </div>
        <div className="btn_transfer">
          <button
            className="ui inverted button"
            onClick={clickSubmit}
            id="submitBtn"
          >
            Transfer
          </button>
        </div>
      </div>
    } />
  );
}

// [DEBUG]
function checkFormData(formData) {
  for (let key of formData.keys()) {
    console.log(key); // FormData의 key 확인
  }
  for (let value of formData.values()) {
    console.log(value); // FormData의 value 확인
  }
}

export default Page_UploadImage;
