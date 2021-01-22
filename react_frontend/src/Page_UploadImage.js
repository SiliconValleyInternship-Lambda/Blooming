import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap';
import "semantic-ui-css/semantic.min.css";
import "./Page_UploadImage.css";
import DragDrop from "./DragDrop";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/core";

function Page_UploadImage() {
  const [myImage, setMyImage] = useState(null);
  const [styleImage, setStyleImage] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const [resultState, setResultState] = useState(null);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #ffffff;
  `;

  const postImage = async () => {
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
  };

  return (
    <div className="App-container">
      <div className="ui placeholder segment">
        {!loadingState && !resultState ? (
          <div>
            <div className="ui two column very relaxed stackable grid">
              {/* dropzone */}
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
          <PropagateLoader
            css={override}
            size={25}
            color={"#00b5ad"}
            loading={loadingState}
          />
        ) : (
            <div className="product">
                <img src= {resultState} alt="result" />
            </div>
        )}
      </div>
      <div className="btn_transfer">
        <button
          className="ui inverted button"
          onClick={postImage}
          id="submitBtn"
        >
          Transfer
        </button>
      </div>
    </div>
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
