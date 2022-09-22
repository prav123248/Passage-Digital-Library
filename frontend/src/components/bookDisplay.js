import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Row, Col,Container, Navbar, Nav} from 'react-bootstrap';
import './BookDisplay.css';
import img from '../assets/Large Sample Image Size.jpg';
import img2 from '../assets/Large Sample Image Size 2.jpg';
import img3 from '../assets/Large Sample Image Size 3.jpg';
function BookDisplay(props) {
  return (
    <div className="scrollContainer">
    <Card className="thumbnail">
      <Card.Img src={img} />
    </Card>
    <Card className="thumbnail">
      <Card.Img src={img2} />
    </Card>
    <Card className="thumbnail">
      <Card.Img src={img3} />
    </Card>
    <Card className="thumbnail">
      <Card.Img src={img2} />
    </Card>
    <Card className="thumbnail">
      <Card.Img src={img} />
    </Card>
    
    <Card className="thumbnail">
      <Card.Img src={img3} />
    </Card>
    <Card className="thumbnail">
      <Card.Img src={img} />
    </Card>
    <Card className="thumbnail">
      <Card.Img src={img} />
    </Card>
    <Card className="thumbnail">
      <Card.Img src={img} />
    </Card>
    <Card className="thumbnail">
      <Card.Img src={img} />
    </Card>
    <Card className="thumbnail">
      <Card.Img src={img} />
    </Card>
    
    </div>
  );
}

export default BookDisplay;