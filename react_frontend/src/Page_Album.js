import React from 'react'
import NavigationBar from './NavigationBar'

function Page_UploadImage({history}) {
    return (
        <NavigationBar history={history} icon={"camera"} pageName={"ALBUM"} content={
            <div>
                hello world
            </div>
        }/>
    )
}

export default Page_UploadImage;