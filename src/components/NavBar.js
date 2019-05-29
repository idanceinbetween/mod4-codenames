import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink, Link } from 'react-router-dom'

const items = [
  { as: NavLink, content: 'Home', to: '/' },
  { as: NavLink, content: 'Play', to: '/play' },
  { as: NavLink, content: 'Word Manager', to: '/wordman' },
  { as: NavLink, content: 'About', to: '/about' }
]

const NavBar = () => <Menu items={items} />

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
