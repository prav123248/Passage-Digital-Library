import './common.css';
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cnavbar from './components/Cnavbar';

function App() {
  var [screenState, setScreen] = useState(1);

  var navColour = ["#76B900","#777777","#777777"];

  if (screenState === 2){
    navColour = ["#777777","#76B900","#777777"]
  }
  else if (screenState === 3) {
    navColour = ["#777777","#777777","#76B900"]
  }    
  

  return (
    <div className="mainContainer">
      <header></header>
      <Cnavbar setScreen={setScreen} navColour={navColour} />
      <bookDisplay />
    </div>

  )

}

export default App;
