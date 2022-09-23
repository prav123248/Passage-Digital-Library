import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Row, Col,Container, Navbar, Nav} from 'react-bootstrap';
import './BookDisplay.css';
import Tooltip from '@mui/material/Tooltip';

function TitleWrapper(props) {


  if (props.title.length > 26) {
    return (
      <Tooltip PopperProps={{modifiers:[{name:"offset", options:{offset:[0,-15]}}]}} title={props.title}>
        <div className="thumbTitle">
          <p>{props.title}</p>
        </div>
      </Tooltip>
    );
  }
  else {
    return (
      <div className="thumbTitle">
        <p>{props.title}</p>
      </div>
    );
  }
}

export default TitleWrapper;