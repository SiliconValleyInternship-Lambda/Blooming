import React from 'react'
import { Header, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import './NavigationBar.css'

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
      <Menu.Item as='a' id="transpageBtn" onClick={() => props.history.push("/transfer")}>
        <Icon name='home' />
        Transfer
      </Menu.Item >
      <Menu.Item as='a' id="albumpageBtn" onClick={() => props.history.push("/album")}>
        <Icon name='camera' />
        Album
      </Menu.Item>
    </Sidebar>

    <Sidebar.Pusher>
      <Segment basic className="nav_container">
        <Header as='h3' className="title"><Icon name={props.icon}></Icon>{props.pageName}</Header>{props.content}
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
)

export default NavigationBar
