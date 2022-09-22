import '../common.css';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cnavbar from '../components/Cnavbar.js';
import BookDisplay from '../components/BookDisplay.js'

function Home(props) {

    if (props.selection == "read") {
        return (
            <div>
                <Cnavbar navSet={1} />
                <BookDisplay />
            </div>
        )
    }
    else {
        return (
            <div>
                <Cnavbar navSet={2} />
                <BookDisplay />
                <p>To read page</p>
            </div>
        )
    }

}


export default Home;
