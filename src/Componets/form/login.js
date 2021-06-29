import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {validationObj, validationChecks} from "./validations";
import TextInput from "./textInput";
import Row from "react-bootstrap/Row"

import {
  faUser,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";


function Login(props) {
  const [userData, setUserData] = useState({ ...validationObj });

  function validation(value, name) {
    const [showErrors, background] = validationChecks(name, value, userData)
    setUserData((prevData) => ({
      ...prevData,
      [name]: {
        ...userData[name],
        background: background,
        value: value,
        errors: [...showErrors],
      },
    }));
  }

  const validateInput = (event) => {
    let value, name;
    event.target
      ? ({
          target: { value, name },
        } = event)
      : ({
          currentTarget: { value, name },
        } = event);

    validation(value, name);
  }

  return (
      <Modal
        size="sm"
        show={props.smShow}
        onHide={() => props.showLogin(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Container className="main">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <TextInput
              label="Enter Username"
              name="username"
              type="text"
              placeholder="Enter Username"
              validateInput={validateInput}
              background={userData.username.background}
              errors={userData.username.errors}
              icon={faUser}
            />
          <TextInput
              label="Enter Password"
              name="password"
              type="password"
              placeholder="Enter Password"
              validateInput={validateInput}
              background={userData.password.background}
              errors={userData.password.errors}
              icon={faUnlockAlt}
            />
            <Row className="justify-content-center">
            <Button type="submit" variant="outline-info">
                Login
              </Button>
            </Row>
        </Modal.Body>
        </Container>
      </Modal>
  );
}

export default Login;
