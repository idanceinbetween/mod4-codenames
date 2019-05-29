import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class NavBar extends Component {
  state = {}
  render() {
    return (
      <Menu inverted>
        <Menu.Item as={NavLink} exact to='/' name='home'>
          Home
        </Menu.Item>
        <Menu.Item as={NavLink} exact to='/play' name='play'>
          Play
        </Menu.Item>
        <Menu.Item as={NavLink} exact to='/wordman' name='wordman'>
          Word Manager
        </Menu.Item>
        <Menu.Item as={NavLink} exact to='/about' name='about'>
          About
        </Menu.Item>
      </Menu>
    )
  }
}

export default NavBar
