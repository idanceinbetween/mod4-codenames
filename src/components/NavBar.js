import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const NavBar = () => (
  <Menu>
    <NavLink to='/' exact>
      Home
    </NavLink>
    |
    <NavLink to='/games' exact>
      Games
    </NavLink>
    |
    <NavLink to='/about' exact>
      About
    </NavLink>
  </Menu>
)

export default NavBar
