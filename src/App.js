import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pages from "./Componets/switchPages";
import MyNavbar from "./Componets/navbar"
import Footer from "./Componets/footer"
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  const fetch = require('node-fetch')
  
  fetch("http https://videogamesapi.herokuapp.com/api/genres/")
  .then(response => console.log(response))
  .then(data => console.log(data))

  return (
    <Router>
      <MyNavbar />
      <Pages />
      <Footer />
    </Router>
  );
}

export default App;
