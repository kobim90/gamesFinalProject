import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pages from "./Componets/switchPages";
import MyNavbar from "./Componets/navbar";
import Footer from "./Componets/footer";
import { BrowserRouter as Router} from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import AuthiApi from "./DAL/AuthApi";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import userApi from "./DAL/userApi";
import { getUserGameList} from "./DAL/api"

function App() {
  const [auth, setAuth] = useState(Cookies.get("user") ? true : false)
  const [user, setUser] = useState([])

  useEffect( () => {
    (async function getData() {
      if (Cookies.get("user")) {
        const gameList = await getUserGameList()
        setUser(gameList)
      }
    })()
  }, [])

  return (
    <AuthiApi.Provider value={{auth, setAuth}}>
    <userApi.Provider value={{user, setUser}}>
    <Router>
      <Container className="header" fluid></Container>
      <MyNavbar />
      <Pages />
      <Footer />
    </Router>
    </userApi.Provider>
    </AuthiApi.Provider>
  );
}

export default App;
