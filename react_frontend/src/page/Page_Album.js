import React, { useEffect, useState } from 'react'
import NavigationBar from '../component/NavigationBar'
import Gallery from 'react-grid-gallery';
import axios from "axios";
import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";
import "semantic-ui-css/semantic.min.css";
import styled from "styled-components";
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import './PagesStyle.css'

const TableContainer = styled.div`
overflow: scroll;
&::-webkit-scrollbar {
    width: 8px;
    height: 0px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
height: 550px;
border: 10px solid white;
`;

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

  const message = (title, message, type) =>{
    store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 3000,
      },
      dismissable: {
        Click: true
      }
    });
  }

  useEffect(() => {
    axios.get("/get_album").then((Response) => {
      console.log("response - ok"); //[DEBUG]
      const imgs = [];
      for (var i = Response.data.length - 1; i > -1; i--) {
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
      setLoadingState(false);
      return message("ERROR", "Please check the console for an error message.", "warning")
    });
  }, [])

  const handleUserInput = (ss) => {
    setSs(ss);
    const newTemp = []
    if (ss !== "") {
      imgs.forEach((m) => {
        if (m.caption.indexOf(ss) === -1) {
          return;
        }
        // push to array
        newTemp.push(m);
      })
    }
    if (ss === "") {
      imgs.forEach((m) => {
        newTemp.push(m);
      })
    }
    setTmps(newTemp);
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
        <div className="Album-App-container">
          <div className="search">
            <ReactNotification />
            <SearchBar ss={ss} onUserInput={handleUserInput} />
          </div>
          <TableContainer className='tablecontainer'>
            <Gallery images={tmps} />
          </TableContainer>
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
