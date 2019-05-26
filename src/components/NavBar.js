import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

// const items = [
//   { key: "home", active: true, name: "Home" },
//   { key: "start", name: "Start A Game" },
//   { key: "about", name: "About Us" }
// ];

const NavBar = () => (
  <div>
    {/* <Menu items={items} /> */}
    <Menu>
      <Link to='/'>Home</Link>|<Link to='/games'>Games</Link>|
      <Link to='/about'>About</Link>
    </Menu>
  </div>
)

export default NavBar
