import React from 'react'
import { Header, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import './NavigationBar.css'

// const headerStyle = {
//   font-size: 35px;
//   margin-bottom: 50px;
//   padding: 60px 0 10px 60px;
//   background: #ffffff;
//   border-bottom: solid 1px #cfcfcf;
//   box-shadow: 2px 2px 2px #ececec;
// }

// const load_transferpage = () => {
//   (<div> <Header as='h3' className="title"><Icon name='home'></Icon>TRANSFER IMAGE</Header></div>)
//   history.push("/transfer");
// }

// const load_albumpage = () => {
//   history.push("/album");
// }

const NavigationBar = (props) => (
  <Sidebar.Pushable as={Segment} >
    <Sidebar
      as={Menu}
      animation='push'
      icon='labeled'
      inverted
      vertical
      visible
      width='thin'
    >
      <Menu.Item as='a' id="transpageBtn" onClick={ () => props.history.push("/")}>
        <Icon name='home' />
        Transfer
      </Menu.Item > 
      <Menu.Item as='a' id="albumpageBtn" onClick={ () => props.history.push("/album")}>
        <Icon name='camera' />
        Album
      </Menu.Item>
    </Sidebar>

    <Sidebar.Pusher>
      <Segment basic className="nav_container">
        {/* {          
          page === "default" || page === "transfer" ?
          (<div> <Header as='h3' className="title"><Icon name='home'></Icon>TRANSFER IMAGE</Header> {history.push("/transfer")} </div>)
          : (<div> <Header as='h3' className="title"><Icon name='camera'></Icon>ALBUM</Header> {history.push("/album")} </div>)
        } */}
        {/* {props.content} */}
        <Header as='h3' className="title"><Icon name={props.icon}></Icon>{props.pageName}</Header>{props.content}
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
)

export default NavigationBar
