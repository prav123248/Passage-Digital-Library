import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col,Container, Navbar, Nav} from 'react-bootstrap';
import '../common.css';

function Cnavbar(props) {
  return (
    <Navbar className="navStyle" variant="dark">
    <Navbar.Brand className="col-sm-1 text-center">Passage</Navbar.Brand>
    <Container>
      <Nav className="navBox">
        <Nav.Link className="navLink" href="#Library" onClick={()=>{props.setScreen(1)}} style={{color : props.navColour[0]}}>Library</Nav.Link>
        <Nav.Link className="navLink" href="#ToRead" onClick={()=>{props.setScreen(2)}} style={{color : props.navColour[1]}}>To Read</Nav.Link>
        <Nav.Link className="navLink" href="#Statistics" onClick={()=>{props.setScreen(3)}} style={{color : props.navColour[2]}}>Statistics</Nav.Link>              
      </Nav>

      <Nav className="navBox">
        <Nav.Link className="navLink" href="#Add" style={{color : "#76B900"}}>Add Book</Nav.Link>
        <Nav.Link className="navLink" href="#Remove" style={{color : "#76B900"}}>Remove Book</Nav.Link>
        <Nav.Link className="navLink" href="#Mark" style={{color : "#76B900"}}>Mark Read</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  );
}

export default Cnavbar;