import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Login from "./login";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

function MyNavbar(props) {
  const [smShow, setSmShow] = useState(false);

  return (
    <Container className="header">
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Small Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <FontAwesomeIcon icon={faGamepad} size="2x" />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <NavLink to="/" className="link p-2" activeClassName="selected">
              Home
            </NavLink>
            <NavLink
              to="/allGames"
              className="link p-2"
              activeClassName="selected"
            >
              All Games
            </NavLink>
          </Nav>
          <Nav className="justify-content-between">
            <Nav.Link
              className="float-right link p-2"
              onClick={() => setSmShow(true)}
            >
              Login
            </Nav.Link>
            <NavLink
              to="/Register"
              className="float-right link p-2"
              activeClassName="selected"
            >
              Register
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </Container>
  );
}

export default MyNavbar;
