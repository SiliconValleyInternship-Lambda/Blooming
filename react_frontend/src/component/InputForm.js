import React, { useState } from 'react';
import './ComponentsStyle.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function InputForm(props) {
  const [username, setUsername] = useState("");
  const [imagename, setImagename] = useState("");
  const classes = useStyles();

  const handleClose = () => {
    props.setOpen(false);
  };

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
  
  const clickSave = async () => {
    if (username==="" || imagename==="") {
      message("확인", "user name과 image name을 입력해주세요", "default")
      return false;
    }
    try {
      await axios
      .post("/save_image", {
        author: username,
        name: imagename,
        url: props.url
      }, {
        header: {
          "content-type": "application/json",
        },
      })
      .then(response => { 
        // db 저장 성공
        console.log(JSON.stringify(response.data));
        props.setSaveState(true);        
      });
    } catch (error) {
      console.log(error);
      message("ERROR", "Please check the console for an error message.", "warning")
      setUsername("");
      setImagename("");
    }
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
      
      <div className={classes.paper} id="inputform_box"> 
        {
          props.saveState ? 
          (
            <div className="success_save">
              
              <CheckCircleIcon fontSize="large" />
              <p> 저장이 완료되었습니다. </p>
              <div class="ui buttons">
                <button class="ui button" onClick={async () => props.setOpen(false)}>닫기</button>
                <div class="or"></div>
                <button class="ui positive button saveBtn" onClick={ () => {props.setOpen(false); props.setGoAlbum(true); }}>Album 바로가기</button>
              </div> 
            </div>
          ) : (
            <div className="input_info" >
              <h2 id="transition-modal-title">이미지에 대한 정보를 입력해주세요.</h2>
              <ReactNotification />
              <div id="transition-modal-description">
                <TextField required id="standard-basic userName" label="user name" onChange={(e) => setUsername(e.target.value) }/> <br/>
                <TextField required id="standard-basic imageName" label="image name" onChange={(e) => setImagename(e.target.value)}/> <br />
                <div class="ui buttons">
                  
                  <button class="ui button" onClick={async () => props.setOpen(false)}>취소</button>
                  <div class="or"></div>
                  <button class="ui positive button saveBtn" onClick={clickSave}>저장</button>
                </div> 
              </div>
            </div>
          )
        }
        </div>
      </Fade>
    </Modal>
  );
}