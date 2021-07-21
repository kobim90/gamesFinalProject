import React from "react";
import { useState, useEffect } from "react";
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
import userApi from "../../DAL/userApi";

function Login(props) {
  const Auth = React.useContext(AuthApi);
  const User = React.useContext(userApi);
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
      if (res.data.username) {
        props.showLogin(false);
        setLoginError("");
        Auth.setAuth(true);
        User.setUser(Cookies.getJSON("user").gameID);
        setUserData({
          username: { ...validationObj["username"] },
          password: { ...validationObj["password"] },
        });
      } else {
        setLoginError("Password or username are incorrect try again");
      }
    } catch (error) {
      setLoginError(error.message);
    }
  }

  async function validation({ target: { value, name } }) {
    console.log("value: ", value);
    const [showErrors, background] = await validationChecks(
      name,
      value,
      userData
    );
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
      validation({ target: { name: key, value: userData[key].value } });
      if (userData[key].errors.length > 0 || !userData[key].value) {
        errorsCount++;
      }
    }
    if (!errorsCount) {
      entry();
    }
  };

  // useEffect(() => {

  // },[])

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
            <Form.Group>
              <small id="error" className="form-text text-danger">
                {loginError}
              </small>
            </Form.Group>

            <Form.Group>
              <Form.Text>
                Are you an Admin? go <a href="http://localhost:3400/">here</a>
              </Form.Text>
            </Form.Group>
            <Row className="justify-content-center">
              <Button type="submit" variant="outline-danger">
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
