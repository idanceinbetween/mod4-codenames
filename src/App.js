import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import MainCanvas from "./containers/MainCanvas";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <MainCanvas />
    </div>
  );
}

export default App;
