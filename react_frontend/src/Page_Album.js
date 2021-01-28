import React, {useEffect, useState} from 'react'
import NavigationBar from './NavigationBar'
import './index.css';
import Gallery from 'react-grid-gallery';
import axios from "axios";
import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";


function Page_Album({history}) {
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
        tags: [{value: "", title: ""}],
        caption: ""
    }]);

    useEffect(() => {  
        axios.get("/get_album")
        .then((Response) => {
            console.log("response - ok"); //[DEBUG]
            const imgs=[];
            for (var i = 0; i < Response.data.length; i++) {
                imgs.push({
                    src : Response.data[i].src,
                    thumbnail : Response.data[i].src,
                    // thumbnailWidth : 350,
                    // thumbnailHeight : 210,
                    tags : [{value:Response.data[i].name, title:Response.data[i].name}],
                    caption: Response.data[i].author + " / "+ Response.data[i].name
                })
            }
            setImgs(imgs);
            setLoadingState(false);
        }).catch((Error) => {
            console.log(Error);
        })
    }, [])
        
    return (
        <NavigationBar history={history} icon={"camera"} pageName={"ALBUM"} content={
            loadingState ? 
            (
                // loading
                <DotLoader
                css={override}
                size={25}
                color={"#00b5ad"}
                loading={loadingState}
                />
            ) : (
                <div className="App-container">
                    <Gallery images={imgs}/>
                </div>
            )
        }/>
    )
}

export default Page_Album;
