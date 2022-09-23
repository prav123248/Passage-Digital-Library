import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Row, Col,Container, Navbar, Nav} from 'react-bootstrap';
import './BookDisplay.css';
import img from '../assets/Large Sample Image Size.jpg';
import img2 from '../assets/Large Sample Image Size 2.jpg';
import img3 from '../assets/Large Sample Image Size 3.jpg';
import img4 from '../assets/Large Sample Image Size 4.jpg';
import TitleWrapper from './TitleWrapper';
function BookDisplay(props) {
  return (
    
    <div className="scrollContainer">

      <Card className="thumbnailCard">
        <Card.Img className="thumbImg" src={img} />
        <TitleWrapper title="The Mountain Sings"/>
        <div className="thumbOverlay">
        <Card.ImgOverlay>
          <Card.Title>Card title</Card.Title>
          <p>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
        </Card.ImgOverlay>
        </div>
      </Card>

      <Card className="thumbnailCard">
        <Card.Img className="thumbImg" src={img} />
        <TitleWrapper title="The Mountain Sings"/>
        <div className="thumbOverlay">
        <Card.ImgOverlay>
          <Card.Title>Card title</Card.Title>
          <p>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
        </Card.ImgOverlay>
        </div>
      </Card>


    </div>
  );
}

export default BookDisplay;