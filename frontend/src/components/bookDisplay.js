import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Row, Col,Container, Navbar, Nav} from 'react-bootstrap';
import './BookDisplay.css';

import TitleWrapper from './TitleWrapper';
function BookDisplay(props) {

  var displayBooks = (bookRecords) => {
    var bookJSX = []

    
    for (var i=0; i<bookRecords.length; i++) {
      if (bookRecords[i]["bookID"] === undefined) {
        console.log(bookRecords[i]["name"])
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
      else {
          console.log(bookRecords[i]["bookID"]["name"])
          bookJSX.push(
            <Card className="thumbnailCard">
              <Card.Img className="thumbImg" src={"/media/Covers/" + bookRecords[i]["bookID"]["coverPath"]} />
              <TitleWrapper title={bookRecords[i]["bookID"]["name"]}/>
              <div className="thumbOverlay">
                <Card.ImgOverlay> 
                  <p>
                    <b>Genre :</b> 
                    <br></br>
                    {bookRecords[i]["bookID"]["genre"]}
                    <br></br>
                    <br></br>
                    <b>Author :</b><br></br> {bookRecords[i]["bookID"]["author"]}
                    <br></br><br></br>
                    <b>Pages :</b> {bookRecords[i]["bookID"]["pageCount"]}
                    <br></br>
                    <br></br>
                    <b>Finished :</b> {bookRecords[i]["dateFinished"]}
                    {console.log(typeof bookRecords[i]["dateFinished"])}
                    <br></br>
                    <br></br>
                    <b>Publish Date :</b> {bookRecords[i]["bookID"]["publishedDate"]}
                  </p>
                </Card.ImgOverlay>
              </div>
            </Card>
          )
      }
    }

    
    return bookJSX;
  }


    /**
    for (var i=0; i<(bookRecords["count"]); i++) {
      bookJSX.push(
        <Card className="thumbnailCard">
          <Card.Img className="thumbImg" src={img} />
          <TitleWrapper title={bookRecords["results"][i]["name"]}/>
          <div className="thumbOverlay">
            <Card.ImgOverlay> 
              <p>
                <b>Genre :</b> 
                <br></br>
                {bookRecords["results"][i]["Genre"]}
                <br></br>
                <br></br>
                <b>Author :</b><br></br> {bookRecords["results"][i]["Author"]}
                <br></br>
                <br></br>
                <b>Pages :</b> {bookRecords["results"][i]["PageCount"]}
                <br></br>
                <br></br>
                <b>Publish Date :</b> {bookRecords["results"][i]["PublishedDate"]}
              </p>
            </Card.ImgOverlay>
          </div>
        </Card>
      )
    }
     */
  

  if (props.bookData !== undefined) {
    return (
      <div className="scrollContainer">
        {displayBooks(props.bookData["results"])}
      </div>
    )} 

}

export default BookDisplay;