import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col,Container, Navbar, Nav} from 'react-bootstrap';
import '../common.css';
import {NavLink} from "react-router-dom";

function Cnavbar(props) {

  
  return (
    <Navbar className="navStyle" variant="dark">
    <Navbar.Brand className="col-sm-1 text-center">Passage</Navbar.Brand>
    
    <div className="navContainer">
      <Nav className="navBox">
        <NavLink className="navLinkStyle" to="/Library" style={ { color: (props.navSet == 1) ? '#76B900' : '#777777'} }>Library</NavLink>
        <NavLink className="navLinkStyle" to="/ToRead" style={ { color: (props.navSet == 2) ? '#76B900' : '#777777' } }>To Read</NavLink>
        <NavLink className="navLinkStyle" to="/Statistics" style={ { color: (props.navSet == 3) ? '#76B900' : '#777777' } }>Statistics</NavLink>              
      </Nav>

      <Nav className="navBox rightNav">
        <NavLink className="navLinkStyle" to="/Manage" style={ { color: (props.navSet == 4) ? '#76B900' : '#777777' } }>Manage Books</NavLink>
      </Nav>
    </div>
  </Navbar>
  );
}

export default Cnavbar;