import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Row, Col,Container, Navbar, Nav} from 'react-bootstrap';
import './BookDisplay.css';

import TitleWrapper from './TitleWrapper';
function BookDisplay(props) {

  var [books, setBooks] = useState("");

  useEffect(() => {
    var url = "/db/Book/" + props.selection + "/?format=json";
    props.dbCall(url, setBooks);
  },[props.selection]);

  var displayBooks = (bookRecords) => {
    var bookJSX = []

    if (bookRecords.length > 0 && bookRecords[0]["dateFinished"] === null) {
      
      for (var i=0; i<bookRecords.length; i++) {
        bookJSX.push(
          <Card className="thumbnailCard">
            <Card.Img className="thumbImg" src={"/media/Covers/" + bookRecords[i]["coverPath"]} />
            <TitleWrapper title={bookRecords[i]["name"]}/>
            <div className="thumbOverlay">
              <Card.ImgOverlay> 
                <p>
                  <b>Genre :</b> 
                  <br></br>
                  {bookRecords[i]["genre"]}
                  <br></br>
                  <br></br>
                  <b>Author :</b><br></br> {bookRecords[i]["author"]}
                  <br></br>
                  <br></br>
                  <b>Pages :</b> {bookRecords[i]["pageCount"]}
                  <br></br>
                  <br></br>
                  <b>Publish Date :</b> {bookRecords[i]["publishedDate"]}
                </p>
              </Card.ImgOverlay>
            </div>
          </Card>
        )
      }
    }
    else {
      for (var i=0; i<bookRecords.length; i++) {
        bookJSX.push(
          <Card className="thumbnailCard">
            <Card.Img className="thumbImg" src={"/media/Covers/" + bookRecords[i]["coverPath"]} />
            <TitleWrapper title={bookRecords[i]["name"]}/>
            <div className="thumbOverlay">
              <Card.ImgOverlay> 
                <p>
                  <b>Genre :</b> 
                  <br></br>
                  {bookRecords[i]["genre"]}
                  <br></br>
                  <br></br>
                  <b>Author :</b><br></br> {bookRecords[i]["author"]}
                  <br></br>
                  <br></br>
                  <b>Pages :</b> {bookRecords[i]["pageCount"]}
                  <br></br>
                  <br></br>
                  <b>Publish Date :</b> {bookRecords[i]["publishedDate"]}
                  <br></br>
                  <br></br>
                  <b>Finished :</b> <br></br>
                  {bookRecords[i]["dateFinished"].slice(0,10)}
                </p>
              </Card.ImgOverlay>
            </div>
          </Card>
        )
      }
    }

    return bookJSX;

  }
  
  if (books !== undefined) {
    return (
      <div className="scrollContainer">
        {displayBooks(books)}
      </div>
    )} 

}

export default BookDisplay;