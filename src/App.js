import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pages from "./Componets/switchPages";
import MyNavbar from "./Componets/navbar";
import Footer from "./Componets/footer";
import { BrowserRouter as Router} from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import AuthiApi from "./DAL/AuthApi";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [auth, setAuth] = useState(Cookies.get("user") ? true : false)

  return (
    <AuthiApi.Provider value={{auth, setAuth}}>
    <Router>
      <Container className="header" fluid></Container>
      <MyNavbar />
      <Pages />
      <Footer />
    </Router>
    </AuthiApi.Provider>
  );
}

export default App;
