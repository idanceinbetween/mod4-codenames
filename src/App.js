import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import MainCanvas from "./containers/MainCanvas";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GameBoard from "./components/GameBoard";
import About from "./components/About";

function App() {
  return (
    <div className="App">
      <NavBar />
      <MainCanvas />
    </div>
  );
}

export default App;
