import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { validationObj, validationChecks } from "./validations";
import TextInput from "./textInput";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { postLogin } from "../../DAL/api";
import Cookies from "js-cookie";

import { faUser, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import AuthApi from "../../DAL/AuthApi";

function Login(props) {
  const Auth = React.useContext(AuthApi);
  const [userData, setUserData] = useState({
    username: { ...validationObj["username"] },
    password: { ...validationObj["password"] },
  });
  const [loginError, setLoginError] = useState("");

  async function entry() {
    try {
      const res = await postLogin(
        userData["username"].value,
        userData["password"].value
      );
      if (res.data) {
        props.showLogin(false);
        setLoginError("");
        Auth.setAuth(true);
      } else {
        setLoginError("Password or username are incorrect try again");
      }
    } catch (error) {
      console.log('EEE', error);
      setLoginError(error.message);
    }
  }

  async function validation({ target: { value, name } }) {
    const [showErrors, background] = await validationChecks(name, value, userData);
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

  const onSubmit = (e) => {
    e.preventDefault();
    let errorsCount = 0;
    for (const key in userData) {
      if (userData[key].errors.length > 0 || !userData[key].value) {
        errorsCount++;
      }
    }
    if (!errorsCount) {
      entry();
    }
  };

  return (
    <Modal
      size="sm"
      show={props.smShow}
      onHide={() => props.showLogin(false)}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Container className="main">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <TextInput
              label="Enter Username"
              name="username"
              type="text"
              placeholder="Enter Username"
              validateInput={validation}
              background={userData.username.background}
              errors={userData.username.errors}
              icon={faUser}
            />
            <TextInput
              label="Enter Password"
              name="password"
              type="password"
              placeholder="Enter Password"
              validateInput={validation}
              background={userData.password.background}
              errors={userData.password.errors}
              icon={faUnlockAlt}
            />
            <small id="error" className="form-text text-danger">
              {loginError}
            </small>
            <Row className="justify-content-center">
              <Button type="submit" variant="outline-info">
                Login
              </Button>
            </Row>
          </Form>
        </Modal.Body>
      </Container>
    </Modal>
  );
}

export default Login;
