import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import React, { useEffect, useState } from "react";
import Login from "./form/login";
import { NavLink } from "react-router-dom";
import AuthApi from "../DAL/AuthApi";
import Cookies from "js-cookie";

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
 
  // console.log(JSON.parse(Cookies.get("user")));
  return (
    <Container fluid>
      <Login showLogin={showLogin} smShow={smShow} />
      <Navbar bg="dark" variant="dark" fixed="top" collapseOnSelect expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Container>
            <Navbar.Brand href="#home">
              <FontAwesomeIcon icon={faGamepad} size="2x" />
            </Navbar.Brand>
            <Nav className="mr-auto">
              <NavLink to="/home" className="link p-2" activeClassName="active">
                Home
              </NavLink>
              <NavLink
                to="/allGames"
                className="link p-2"
                activeClassName="active"
              >
                All Games
              </NavLink>
            </Nav>
            <Nav className="justify-content-between">
              {userNav ? <>
                <NavLink
                  to="/user"
                  className="float-right link p-2"
                  activeClassName="active"
                >
                  {Cookies.getJSON("user").username}
                  
                </NavLink> 
                <button className="logout" onClick={logout}>Logout</button>
               </> : (
                <>
                  <Nav.Link
                    className="float-right link p-2"
                    onClick={() => setSmShow(true)}
                  >
                    Login
                  </Nav.Link>
                  <NavLink
                    to="/Register"
                    className="float-right link p-2"
                    activeClassName="active"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default MyNavbar;
