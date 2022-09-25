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


function Manage() {

  var [dbRemove, setRemove] = useState("");
  var [dbMark, setMark] = useState("");
  var [dbData, setData] = useState("");
  var [removeSelect, setSelectedRemove] = useState("");
  var [markSelect, setSelectedMark] = useState("");
  var [filteredRemove, setFilteredRemove] = useState("");
  var [filteredMark, setFilteredMark] = useState("");

  var optionDBCall = (dbURL, setMethod) => {
    var currentUrl = window.location.protocol + "//" + window.location.host
    currentUrl = currentUrl + dbURL;
    fetch(currentUrl)
    .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }

        setMethod(data);
        
    })
  }

  useEffect(() => {
    optionDBCall("/db/Book/?format=json", setRemove);
    optionDBCall("/db/toRead/?format=json", setMark);

  },[]);
  
  var optionDBList = (data, setFilteredResults) => {
    var output = [[],[]]
    if (data) {
      for (var i=0; i<data["results"].length; i++) {
        if (((data["results"][i]["name"]).toLowerCase()).startsWith((removeSelect).toLowerCase())) {
          output[0].push(data["results"][i]["name"])
          output[1].push(data["results"][i]["id"])
        }
      }
    }
    setFilteredResults(output);
    console.log(output)
  }

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


  var deleteRecord = (title) => {
    for (var i=0; i<filteredRemove[0].length; i++) {
      if (filteredRemove[0][i] === title) {
        var deleteURL = window.location.protocol + "//" + window.location.host + "/db/Book/delete/" + filteredRemove[1][i];
        console.log(deleteURL);
        fetch(deleteURL,{ method: 'DELETE' })
        return
      }
    
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

          <Form className="innerForm" action="addBook/" method="post">
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
          <h1>Remove book</h1>
          <Form className="innerForm">
            <Form.Group controlId="dropDown">
              <AutoComplete id="removeDropdown" dropdown value={removeSelect} onChange={(e) => setSelectedRemove(e.value)} suggestions={filteredRemove[0]} completeMethod={()=>{optionDBList(dbRemove, setFilteredRemove)}} />
            </Form.Group>
            <Button className="leftAlignButton" onClick={()=>{deleteRecord(removeSelect)}} variant="primary" type="submit">
              Remove
            </Button>
          </Form>
        </div>

        <div className="formContainer">
          <h1>Mark as read</h1>
          <Form className="innerForm innerMarkForm">
              <AutoComplete dropdown value={markSelect} onChange={(e) => setSelectedMark(e.value)} suggestions={filteredMark[0]} completeMethod={()=>{optionDBList(dbMark, setFilteredMark)}} />
              <br></br>
              <br></br>
              <Calendar className="cal"></Calendar>
          
          <Button className="leftAlignButton" variant="primary" type="submit">
            Mark
          </Button>
          </Form>
        </div>
    </div>
  )

}


export default Manage;
