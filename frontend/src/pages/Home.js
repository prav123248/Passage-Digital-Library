import '../common.css';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cnavbar from '../components/Cnavbar.js';
import BookDisplay from '../components/BookDisplay.js'

function Home(props) {
    var [books, setBooks] = useState("");
    
    var currentUrl = window.location.protocol + "//" + window.location.host


    var bookDbCall = (dbApi) => {
        currentUrl = currentUrl + dbApi;
        console.log(currentUrl)
        fetch(currentUrl)
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            setBooks(data);
        })
    }

    useEffect(() => {
        var url = "/db/" + props.selection + "/?format=json";
        bookDbCall(url);
    },[props.selection]);


    if (props.selection == "read" && books !== "") {
        return (
            <div>
                <Cnavbar navSet={1} />
                <BookDisplay bookData={books} select={"read"} />
            </div>
        )
    }
    else if (props.selection == "toRead" && books !== ""){

        return (
            <div>
                <Cnavbar navSet={2} />
                <BookDisplay bookData={books} select={"toRead"} />
            </div>
        )
    }

}


export default Home;
