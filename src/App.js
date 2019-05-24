import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import MainCanvas from "./containers/MainCanvas";

function App() {
  return (
    <div className="App">
      <NavBar />
      <MainCanvas />
    </div>
  );
}

export default App;
