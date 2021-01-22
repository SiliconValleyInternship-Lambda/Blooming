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
      <Menu.Item as='a'>
        <Icon name='home' />
        Home
      </Menu.Item>
      {/* <Menu.Item as='a'>
        <Icon name='gamepad' />
        Games
      </Menu.Item> */}
      <Menu.Item as='a'>
        <Icon name='camera' />
        Album
      </Menu.Item>
    </Sidebar>

    <Sidebar.Pusher>
      <Segment basic className="nav_container">
        {
          props.page=="transfer" ? 
            ( <div> <Header as='h3' className="title"><Icon name='home'></Icon>TRANSFER IMAGE</Header></div> )
            : <Icon name='camera'>ALBUM</Icon>
        }
        {props.content}
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
)

export default NavigationBar
