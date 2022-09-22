import '../common.css';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cnavbar from '../components/Cnavbar.js';

function Home(props) {

    if (props.selection == "read") {
        return (
            <div>
                <Cnavbar navSet={1} />
                <p>Read page</p>
            </div>
        )
    }
    else {
        return (
            <div>
                <Cnavbar navSet={2} />
                <p>To read page</p>
            </div>
        )
    }

}


export default Home;
