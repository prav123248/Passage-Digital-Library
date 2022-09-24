import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cnavbar from '../components/Cnavbar.js';
import './Manage.css';
import {Form, Button} from 'react-bootstrap';

function Manage() {

  var [apiData, setApiData] = useState(0);

  var [url, setUrl] = useState("");
  var [title, setTitle] = useState("");
  var [author, setAuthor] = useState("");
  var [genre, setGenre] = useState("");
  var [pagecount, setPages] = useState("");
  var [date, setDate] = useState("");
  var [coverID, setCover] = useState("");
  var [authors, setAuthors] = useState("");
  var [coverPage, setCoverPage] = useState("");


  

  const apiCall = (webPage) => {
    fetch(webPage.substr(0,webPage.lastIndexOf("/"))+".json")
    .then(async response => {
      const data = await response.json();
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      setApiData(data)
      title = data["title"];
      
      if (data["authors"] !== undefined) {
        author = data["authors"]["key"];
        if (author === undefined) {
          author = data["authors"][0]["key"]
        }
      }

      if (author !== undefined) {
        var authorPage = "https://openlibrary.org" + author + ".json" 
        fetch(authorPage)
        .then(async response => {
          const authorData = await response.json();
          if (!response.ok) {
            return Promise.reject(response.statusText);
          }
          author = authorData["name"];
          if (author !== undefined) {
            document.getElementsByName("author")[0].value = author
          }
        })
      }

      date = data["publish_date"];
      pagecount = data["number_of_pages"];

      if (data["covers"] !== undefined) {
        coverID = data["covers"][0]
        coverPage = "https://covers.openlibrary.org/b/id/" + coverID + "-L.jpg";
        document["coverPreview"].src = coverPage;
        
      }


      if (title !== undefined) {
        document.getElementsByName("title")[0].value = title;
      }

      if (date !== undefined) {
        document.getElementsByName("published")[0].value = date;
      }

      if (pagecount !== undefined) {
        document.getElementsByName("pagecount")[0].value = pagecount;
      }

    })
    .catch(error => {
      console.log(error)
      console.log("Error")
    })
  }

  const addBook = (event) => {
    event.preventDefault();
    apiCall(event.target.olurl.value);


  }

  return (
    <div>
        <Cnavbar navSet={4} />
        <div className="formContainer">
          <h1>Add book</h1>
          <Form onSubmit={addBook} className="addForm">
            <Form.Group controlId="URL">
              <Form.Control name="olurl" placeholder="OpenLibrary /Books URL" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Fill In
            </Button>
          </Form>

          <Form className="addForm" action="addBook/" method="post">
            <Form.Group controlId="bookDetails">
              <Form.Control name="title" maxLength="255" className="bookDetail" placeholder="Book Title" />
              <Form.Control name="author" maxLength="255" className="bookDetail" placeholder="Author" />
              <Form.Control name="genre" maxLength="255" className="bookDetail" placeholder="Genre" />
              <Form.Control name="pagecount" maxLength="255" className="bookDetail" placeholder="Number of Pages" />
              <Form.Control name="published" maxLength="255" className="bookDetail" placeholder="Published Date" />
              <img name="coverPreview" src="" style={{color:"white"}} alt="Book Cover" width="157" height="242"></img>
              <Button id="addDetailButton" variant="primary" type="submit">Add</Button>
            
            </Form.Group>
          
          </Form>





        </div>

        <div className="formContainer">
          <h1>Remove book</h1>
        </div>

        <div className="formContainer">
          <h1>Mark book</h1>
        </div>
    </div>
  )

}


export default Manage;
