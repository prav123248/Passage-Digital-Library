import '../common.css';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cnavbar from '../components/Cnavbar.js';
import BookDisplay from '../components/BookDisplay.js'

function Home(props) {
    return (
        <div>
            <Cnavbar navSet={props.select[1]} />
            <BookDisplay dbCall={props.dbCall} selection={props.select[0]} />
        </div>
    )
}


export default Home;
