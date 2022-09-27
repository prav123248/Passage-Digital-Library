import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cnavbar from '../components/Cnavbar.js';
import './Manage.css';
import {Form, Button, Select} from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import {AutoComplete} from 'primereact/autocomplete';
import {Calendar} from 'primereact/calendar';


function Manage(props) {


  var [apiData, setApiData] = useState(0);
  var [unread, setUnread] = useState("");
  var [allBooks, setBooks] = useState("");
  var [filteredRemove, setFilteredRemove] = useState("");
  var [typedRemove, setTypedRemove] = useState("");
  var [filteredMark, setFilteredMark] = useState("");
  var [typedMark, setTypedMark] = useState("");
  var [filteredUpdate, setFilteredUpdate] = useState("");
  var [typedUpdate, setTypedUpdate] = useState("");
  var [calendarVal, setCalendarVal] = useState("");

  var title;
  var author;
  var date;
  var pagecount;
  var coverID;
  var coverPage;

  
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
        document.getElementsByName("coverPath")[0].value = coverPage;
        
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

  const updateBook = (event) => {
    event.preventDefault();
    for (var i=0; i<allBooks["results"].length; i++) {
      if (event.target.updateDropdown.value === allBooks["results"][i]["name"]) {
        document.getElementsByName("updateID")[0].value = allBooks["results"][i]["id"];
        document.getElementsByName("updateTitle")[0].value = allBooks["results"][i]["name"];
        document.getElementsByName("updateAuthor")[0].value = allBooks["results"][i]["author"];
        document.getElementsByName("updateGenre")[0].value = allBooks["results"][i]["genre"];
        document.getElementsByName("updatePageCount")[0].value = allBooks["results"][i]["pageCount"];
        document.getElementsByName("updatePublished")[0].value = allBooks["results"][i]["publishedDate"];
        
        if (allBooks["results"][i]["dateFinished"] !== null) {
          document.getElementsByName("updateDateFinished")[0].value = allBooks["results"][i]["dateFinished"];
          console.log(document.getElementsByName("updateDateFinished")[0].style.display);
          document.getElementsByName("updateDateFinished")[0].style.display = 'block';
        }
        else {
          document.getElementsByName("updateDateFinished")[0].style.display = 'none';
          document.getElementsByName("updateDateFinished")[0].value = null;
        }

        return;
      }
    }

  }

  useEffect(() => {
    props.dbCall("/db/Book/?format=json", setBooks);
    props.dbCall("/db/Book/toRead/?format=json", setUnread);
  },[]);

  var suggestionsFilter = (data, setFilteredResults) => {
    var suggestions = []
    if (data) {
      for (var i=0; i<data.length; i++) {
        
        if (data[i]["name"].toLowerCase().startsWith(typedRemove.toLowerCase())) {
          suggestions.push(data[i]["name"])
        }
      }
      setFilteredResults(suggestions)
    }
  }
  
  return (
    <div>
        <Cnavbar navSet={4} />
        <div className="formContainer">
          <h1>Add book</h1>
          <Form onSubmit={addBook} className="innerForm">
            <Form.Group controlId="URL">
              <Form.Control name="olurl" placeholder="OpenLibrary /Books URL" />
            </Form.Group>
            <Button className="leftAlignButton" variant="primary" type="submit">
              Fill In
            </Button>
          </Form>

          <Form className="innerForm" action="add/" method="post">
            <Form.Group controlId="bookDetails">
              <Form.Control name="title" maxLength="255" className="bookDetail" placeholder="Book Title" />
              <Form.Control name="author" maxLength="255" className="bookDetail" placeholder="Author" />
              <Form.Control name="genre" maxLength="255" className="bookDetail" placeholder="Genre" />
              <Form.Control name="pagecount" maxLength="255" className="bookDetail" placeholder="Number of Pages" />
              <Form.Control name="published" maxLength="255" className="bookDetail" placeholder="Published Date" />
              <Form.Control name="coverPath" id="coverPath" maxLength="255"/>
              <img name="coverPreview" src="" style={{color:"white"}} alt="Book Cover" width="157" height="242"></img>
              <Button id="addDetailButton" variant="primary" type="submit">Add</Button>
            
            </Form.Group>
          </Form>
        </div>

        <div className="formContainer">
          <h1>Update Book</h1>
          <Form onSubmit={updateBook} className="innerForm">
          <Form.Group controlId="URL">
            <AutoComplete name="updateDropdown" dropdown value={typedUpdate} onChange={(e) => setTypedUpdate(e.value)} suggestions={filteredUpdate} completeMethod={()=>{suggestionsFilter(allBooks["results"], setFilteredUpdate)}} />      
          </Form.Group>
          <Button className="leftAlignButton" variant="primary" type="submit">
            Select
          </Button>
          </Form>

          <Form className="innerForm" action="update/" method="post">
            <Form.Group controlId="bookDetails">
              <Form.Control name="updateTitle" maxLength="255" className="bookDetail" placeholder="Book Title" />
              <Form.Control name="updateAuthor" maxLength="255" className="bookDetail" placeholder="Author" />
              <Form.Control name="updateGenre" maxLength="255" className="bookDetail" placeholder="Genre" />
              <Form.Control name="updatePageCount" maxLength="255" className="bookDetail" placeholder="Number of Pages" />
              <Form.Control name="updatePublished" maxLength="255" className="bookDetail" placeholder="Published Date" />
              <Calendar name="updateDateFinished" dateFormat="yy/mm/dd" value={calendarVal} onChange={(e)=>{setCalendarVal(e.value)}}></Calendar>
              <Form.Control name="updateID" maxLength="255" className="bookDetail" style={{display:'none'}} />
              <br></br>
              <Button id="updateButton" variant="primary" type="submit">Update</Button>
            </Form.Group>
          </Form>
        </div>

        <div className="formContainer">
          <h1>Remove book</h1>
          <Form className="innerForm" action="delete/" method="post">
            <Form.Group controlId="dropDown">
              <AutoComplete name="removeSelection" id="removeDropdown" dropdown value={typedRemove} onChange={(e) => setTypedRemove(e.value)} suggestions={filteredRemove} completeMethod={()=>{suggestionsFilter(allBooks["results"], setFilteredRemove)}} />
            </Form.Group>
            <Button className="leftAlignButton" variant="primary" type="submit">
              Remove
            </Button>
          </Form>
        </div>

        <div className="formContainer">
          <h1>Mark as read</h1>
          <Form className="innerForm innerMarkForm" action="mark/" method="post" >
              <AutoComplete name="markDropdown" dropdown value={typedMark} onChange={(e) => setTypedMark(e.value)} suggestions={filteredMark} completeMethod={()=>{suggestionsFilter(unread, setFilteredMark)}} />
              <br></br>
              <br></br>
              <Calendar name="markCalendar" dateFormat="yy/mm/dd" value={calendarVal} onChange={(e)=>{setCalendarVal(e.value)}} id="finishedCalendar"></Calendar>
            <Button className="leftAlignButton" variant="primary" type="submit">
              Mark
            </Button>
          </Form>
        </div>


        
      </div>
  )

}


export default Manage;
