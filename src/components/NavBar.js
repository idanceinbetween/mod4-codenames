import React from "react";
import { Menu } from "semantic-ui-react";

const items = [
  { key: "home", active: true, name: "Home" },
  { key: "start", name: "Start A Game" },
  { key: "about", name: "About Us" }
];

const NavBar = () => <Menu items={items} />;

export default NavBar;
