import ReactDOM from "react-dom/client";
import { useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Manage from "./pages/Manage";
import Statistics from "./pages/Statistics";
import NoPage from "./pages/NoPage";

function App() {
  var [selection, setSelection] = useState("");

  var bookDbCall = (dbURL, setData) => {
      var currentUrl = window.location.protocol + "//" + window.location.host + dbURL;

      fetch(currentUrl)
      .then(async response => {
          const data = await response.json();
          if (!response.ok) {
              return Promise.reject(response.statusText);
          }
          setData(data);
      })
  }

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home dbCall={bookDbCall} select={["read",1]} />} />
          <Route path="Library" element={<Home dbCall={bookDbCall} select={["read",1]} />} />
          <Route path="ToRead" element={<Home dbCall={bookDbCall} select={["toRead",2]} />} />
          <Route path="Statistics" element={<Statistics />} />
          <Route path="Manage" element={<Manage dbCall={bookDbCall} />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter> 
  
  )

}



export default App;
