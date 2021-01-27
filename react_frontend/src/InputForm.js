import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import axios from "axios";

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
  
  const clickSave = async () => {
    // console.log(username+"/"+imagename);
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
        alert("저장 성공");
        props.setSaveState(true);
        props.setOpen(false);
      });
    } catch (error) {
      console.log(error);
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
        <div className={classes.paper}>
          <h2 id="transition-modal-title">이미지에 대한 정보를 입력해주세요.</h2>
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
      </Fade>
    </Modal>
  );
}