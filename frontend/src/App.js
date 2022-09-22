import ReactDOM from "react-dom/client";
import { useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Manage from "./pages/Manage";
import Statistics from "./pages/Statistics";
import NoPage from "./pages/NoPage";

function App() {
  var [apiData, setApiData] = useState(0);
  
  const apiCall = (webPage) => {
    fetch(webPage)
    .then(async response => {
      const data = await response.json();
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      setApiData(data)
    })
    .catch(error => {
      console.log("Error")
    })
  }
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home selection={"read"} />} />
          <Route path="Library" element={<Home selection={"read"} />} />
          <Route path="ToRead" element={<Home selection={"unread"} />} />
          <Route path="Statistics" element={<Statistics />} />
          <Route path="Manage" element={<Manage />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter> 
  
  )

}



export default App;
