import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState, useEffect, useDebugValue } from "react";
import { validationObj, validationChecks } from "./validations";
import GenreCheckbox from "./genreCheckbox";
import TextInput from "./textInput";
import ErrorMessages from "./ErrorMsg";

import {
  faUser,
  faMailBulk,
  faUnlockAlt,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

function Register(params) {
  const [userData, setUserData] = useState({ ...validationObj });
  const [genres, setGenres] = useState({})

  function updatGenres({target : {value, checked, name}}) {
    const newGenres = {...genres}
    if (checked) {
      newGenres[value] = name;
      setGenres({...newGenres})
    }else{
      delete newGenres[value]
      setGenres({...newGenres})
    }
    
  }

  const validateInput = ({target: {value, name}}) => {
    const [showErrors, background] = validationChecks(name, value, userData);
    setUserData((prevData) => ({
      ...prevData,
      [name]: {
        ...userData[name],
        background: background,
        value: value,
        errors: [...showErrors],
      },
    }));
  };

  const inputArr = [
    {
      label: "Enter Username",
      name: "username",
      type: "text",
      validateInput: validateInput,
      background: userData.username.background,
      errors: userData.username.errors,
      icon: faUser,
    },
    {
      label: "Enter Email",
      name: "email",
      type: "text",
      validateInput: validateInput,
      background: userData.email.background,
      errors: userData.email.errors,
      icon: faMailBulk,
    },
    {
      label: "Enter Password",
      name: "password",
      type: "password",
      validateInput: validateInput,
      background: userData.password.background,
      errors: userData.password.errors,
      icon: faUnlockAlt,
    },
    {
      label: "ReEnter Password",
      name: "passwordConfirm",
      type: "password",
      validateInput: validateInput,
      background: userData.passwordConfirm.background,
      errors: userData.passwordConfirm.errors,
      icon: faLock,
    },
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    let error = 0;
    for (const input in userData) {
      validationChecks(userData[input].value, input, userData);
      if (!userData[input].value || userData[input].errors.length > 0) {
        error++;
      }
    }
    if (error === 0) {
      //   props.addStudentList(
      //     userData.username.value,
      //     userData.email.value,
      //     userData.address.value,
      //     userData.course.value,
      //     userData.gender.value
      //   );
      //   props.handleClose();
    }
  };

  return (
    <Container className="main">
      <Row className="text-center">
        <Col>
          <h1>Welcome!</h1>
          <p>Hello Gamer! Please fill in your details</p>
        </Col>
      </Row>
      <hr></hr>
      <Row className="justify-content-center">
        <Col lg="5">
          <Form onSubmit={onSubmit}>
            {inputArr.map((input) => (
              <TextInput
                label={input.label}
                name={input.name}
                type={input.type}
                validateInput={input.validateInput}
                background={input.background}
                errors={input.errors}
                icon={input.icon}
              />
            ))}
            <Form.Row className="justify-content-start">
              <Form.Group controlId="formFile" className="mb-3" as={Col}>
                <Form.Label>
                  <strong>Pick an imgae</strong>
                </Form.Label>
                <Form.Control type="file" onChange={validateInput} name="img"/>
                <ErrorMessages errors={userData.img.errors} />
              </Form.Group>
            </Form.Row>
            <GenreCheckbox validateInput={updatGenres}/>
            <Row className="justify-content-center">
              <Button type="submit" variant="outline-info">
                Submit
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;

