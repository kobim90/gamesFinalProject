import './App.css';
import Container from "react-bootstrap/Container"
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from "react"
import AuthApi from "./DAL/auth"
import {BrowserRouter as Router} from "react-router-dom"
import Switch from "./componets/switch"
import Cookies from "js-cookie"



function App() {
  const [auth, setAuth] = useState(Cookies.getJSON("user") ? true : false)


  return (
    <AuthApi.Provider value={{auth, setAuth}}>
      <Router>
    <Container>
      <Switch />
    </Container>
    </Router>
    </AuthApi.Provider>
  );
}

export default App;
