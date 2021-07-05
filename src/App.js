import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pages from "./Componets/switchPages";
import MyNavbar from "./Componets/navbar";
import Footer from "./Componets/footer";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

function App() {
  return (
    <Router>
      <Container className="header" fluid></Container>
      <MyNavbar />
      <Pages />
      <Footer />
    </Router>
  );
}

export default App;
