import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cnavbar from '../components/Cnavbar.js';

function NoPage() {

  return (
    <div>
        <Cnavbar navSet={5} />
        <p> No page exists here </p>
    </div>
  )

}



export default NoPage;
