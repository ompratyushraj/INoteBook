import { useState } from "react";
import React, { Component } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  // const [count, setCount] = useState(0);
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert ({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/home" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
      {/* <h1>This is working fine.</h1> */}
    </div>
  );
}

export default App;

// const MyContext = createContext({ basename: '/' });?
