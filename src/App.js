import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Componets/Home";
import Pages from "./Componets/switchPages";
import MyNavbar from "./Componets/navbar"
import Footer from "./Componets/footer"
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <MyNavbar />
      <Pages />
      <Footer />
    </Router>
  );
}

export default App;
