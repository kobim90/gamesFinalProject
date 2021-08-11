import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/esm/Image";
import React, { useEffect, useState } from "react";
import Login from "./form/login";
import { NavLink } from "react-router-dom";
import AuthApi from "../DAL/AuthApi";
import Cookies from "js-cookie";
import {decode_flask_cookie} from "../DAL/api"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

function MyNavbar(props) {
  const Auth = React.useContext(AuthApi);
  const [smShow, setSmShow] = useState(false);
  const showLogin = (show) => setSmShow(show);
  const [userNav, setUserNav] = useState(false);
  const onSubmit = (e) => {};

  const logout = () => {
    setUserNav(false)
    Cookies.remove("user")
    Auth.setAuth(false);
  }

  function updateNav() {
    if (Auth.auth) {
      setUserNav(true);
    } else {
      setUserNav(false);
      Auth.setAuth(false);
    }
  }

  useEffect(() => {
    updateNav();
  }, [Auth.auth]);

  return (
    <Container fluid>
      <Login showLogin={showLogin} smShow={smShow} />
      <Navbar bg="dark" variant="dark" fixed="top" collapseOnSelect expand="lg">
        <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Navbar.Brand href="#home">
              <FontAwesomeIcon icon={faGamepad} size="2x" />
            </Navbar.Brand>
            <Nav className="mr-auto">
              <NavLink to="/home" className="link p-2" activeClassName="active">
                HOME
              </NavLink>
              <NavLink
                to="/allGames"
                className="link p-2"
                activeClassName="active"
              >
                GAMES
              </NavLink>
            </Nav>
            <Nav className="justify-content-between">
              {userNav ? <>
                <NavLink
                  to="/user"
                  className="float-right link p-2"
                  activeClassName="active"
                >
                  <Image src={decode_flask_cookie(Cookies.getJSON("user")).img} fluid roundedCircle  className="user-image"/>
                  {decode_flask_cookie(Cookies.getJSON("user")).username.toUpperCase()}
                  
                </NavLink> 
                <NavLink to="/" activeClassName="none" className="float-right link p-2" onClick={logout}>LOGOUT</NavLink>
               </> : (
                <>
                  <Nav.Link
                    className="float-right link p-2"
                    onClick={() => setSmShow(true)}
                  >
                    LOGIN
                  </Nav.Link>
                  <NavLink
                    to="/Register"
                    className="float-right link p-2"
                    activeClassName="active"
                  >
                    REGISTER
                  </NavLink>
                </>
              )}
            </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default MyNavbar;
