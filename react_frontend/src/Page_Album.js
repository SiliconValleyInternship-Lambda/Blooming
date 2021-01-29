import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import './index.css';
import Gallery from 'react-grid-gallery';
import axios from "axios";
import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";
import "semantic-ui-css/semantic.min.css";


function Page_Album({ history }) {
  const override = css`
        display: block;
        margin: 0 auto;
        border-color: #ffffff;
    `;

  const [loadingState, setLoadingState] = useState(true);
  const [imgs, setImgs] = useState([{
    src: "",
    thumbnail: "",
    thumbnailWidth: "",
    thumbnailHeight: "",
    tags: [{ value: "", title: "" }],
    caption: ""
  }]);
  const [tmps, setTmps] = useState([{
    src: "",
    thumbnail: "",
    thumbnailWidth: "",
    thumbnailHeight: "",
    tags: [{ value: "", title: "" }],
    caption: ""
  }]);
  const [ss, setSs] = useState("");

  useEffect(() => {
    axios.get("/get_album").then((Response) => {
      console.log("response - ok"); //[DEBUG]
      const imgs = [];
      for (var i = 0; i < Response.data.length; i++) {
        imgs.push({
          src: Response.data[i].src,
          thumbnail: Response.data[i].src,
          // thumbnailWidth : 350,
          // thumbnailHeight : 210,
          tags: [{ value: Response.data[i].name, title: Response.data[i].name }],
          caption: Response.data[i].author + " / " + Response.data[i].name
        })
      }

      setImgs(imgs);
      setTmps(imgs);
      setLoadingState(false);
    }).catch((Error) => {
      console.log(Error);
      alert("[ERROR] Please check the console for an error message. ");
      setLoadingState(false);
    });
  }, [])

  const handleUserInput = (ss) => {
    setSs(ss);
    if (ss !== "") {
      const newTemp = []
      imgs.forEach((m) => {
        if (m.caption.indexOf(ss) === -1) {
          return;
        }
        //배열에 추가
        newTemp.push(m);
      })
      setTmps(newTemp);
    }
  }

  return (
    <NavigationBar history={history} icon={"camera"} pageName={"ALBUM"} content={
      loadingState ? (
        // loading
        <DotLoader
          css={override}
          size={25}
          color={"#00b5ad"}
          loading={loadingState}
        />
      ) : (<>
        <div className="App-container">
            <div className="search">
            <SearchBar ss={ss} onUserInput={handleUserInput} />
            </div>
          <Gallery images={tmps} />
        </div>
      </>)
    } />
  )
}

// search bar
function SearchBar(props) {
  const onChange = (e) => {
    props.onUserInput(e.target.value);
  }

  return (
    <div class="ui action input">
        <input type={"text"} size={"25"}
            className={"input-sm"} placeholder={"Enter a user or image name.."}
            onChange={onChange} value={props.ss} />
        <button class="ui icon button">
            <i class="search icon"></i>
        </button>
    </div>
  );
}

export default Page_Album;