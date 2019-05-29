import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
const NavBar = () => (
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

// const NavBar = () => (
//   <Menu>
//     <NavLink to='/' exact>
//       Home
//     </NavLink>
//     |
//     <NavLink to='/games' exact>
//       Games
//     </NavLink>
//     |
//     <NavLink to='/about' exact>
//       About
//     </NavLink>
//     |
//     <NavLink to='/wordman' exact>
//       Word Manager
//     </NavLink>
//   </Menu>
// )

export default NavBar
