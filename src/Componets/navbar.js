import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row"
import Modal from "react-bootstrap/Modal";
import Username from "./username"
import Password from "./password"

import Login from "./login";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

function MyNavbar(props) {
  const [smShow, setSmShow] = useState(false);
  const onSubmit = (e) => {}

  return (
    <Container className="header">
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Container className="main">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Username validateInput={() => {}}/>
            <Password validateInput={() => {}}/>
            <Row className="justify-content-center">
            <Button type="submit" variant="outline-info">
                Login
              </Button>
            </Row>
        </Modal.Body>
        </Container>
      </Modal>
      <Navbar bg="dark" variant="dark" fixed="top">
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
            <NavLink
              to="/user"
              className="float-right link p-2"
              activeClassName="active"
            >
              User
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </Container>
  );
}

export default MyNavbar;
