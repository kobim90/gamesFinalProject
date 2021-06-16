import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import InputGroup from "react-bootstrap/InputGroup";

import { useState } from "react";
import ErrorMessages from "./ErrorMsg";

import {
  faUser,
  faMailBulk,
  faCity,
  faGraduationCap,
  faUnlockAlt,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Register(params) {
  const radios = [
    { name: "Male", value: "Male" },
    { name: "Female", value: "Female" },
    { name: "Other", value: "Other" },
  ];

  const [studentData, setStudentData] = useState({
    username: {
      value: "",
      errors: [],
      background: "",
      validations: {
        required: true,
        pattern: /^[0-9a-zA-Z]{2,}$/,
        requirments: "username should be no less than 2 characters",
      },
    },
    email: {
      value: "",
      errors: [],
      background: "",
      validations: {
        required: true,
        pattern:
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        requirments: "email should be valid email (xxx@yyy.zzz)",
      },
    },
    password: {
      value: "",
      errors: [],
      background: "",
      validations: {
        required: true,
        pattern: /^[a-zA-Z!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]{8,}$/,
        requirments: "address should be no less than 8 characters",
      },
    },
    passwordConfirm: {
      value: "",
      errors: [],
      background: "",
      validations: {
        required: true,
        pattern: /^[a-zA-Z!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]{8,}$/,
        requirments: "course must be selected",
      },
    },
    gener: {
      value: "",
      errors: [],
      background: "",
      validations: {
        required: false,
        pattern: /(?:^|\W)Male|Female|Other(?:$|\W)/,
        requirments: "",
      },
    },
  });

  function validation(value, name) {
    const showErrors = [];
    const { validations } = studentData[name];
    let background = "";

    if (validations.required && !value) {
      showErrors.push(`${name} is required`);
      background = "alert-danger";
    }
    if (!validations.pattern.test(value)) {
      showErrors.push(`${validations.requirments}`);
      background = "alert-danger";
    }

    if (name === "paswordConfirm") {
      if (value !== studentData.password.value) {
        showErrors.push(
          `password doesnt match, please recheck your password`
        );
        background = "alert-danger";
      }
    }

    // if (name === "username") {
    //   if (getStudent(value)) {
    //     showErrors.push(
    //       `${value} allready exists, choose a different username`
    //     );
    //     background = "alert-danger";
    //   }
    // }
    setStudentData((prevData) => ({
      ...prevData,
      [name]: {
        ...studentData[name],
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
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let error = 0;
    for (const input in studentData) {
      validation(studentData[input].value, input);
      if (!studentData[input].value || studentData[input].errors.length > 0) {
        error++;
      }
    }
    if (error === 0) {
      //   props.addStudentList(
      //     studentData.username.value,
      //     studentData.email.value,
      //     studentData.address.value,
      //     studentData.course.value,
      //     studentData.gender.value
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
        <Col lg="4">
          <Form onSubmit={onSubmit}>
            <Form.Row className="justify-content-around">
              <Form.Group as={Col} controlId="Username">
                <Form.Label>
                  <strong>Username</strong>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    onChange={validateInput}
                    onBlur={validateInput}
                    name="username"
                    className={studentData.username.background}
                  />
                </InputGroup>
                <ErrorMessages errors={studentData.username.errors} />
              </Form.Group>
            </Form.Row>
            <Form.Row className="justify-content-around">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>
                  <strong>Email</strong>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">
                      <FontAwesomeIcon icon={faMailBulk} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    onChange={validateInput}
                    onBlur={validateInput}
                    name="email"
                    className={studentData.email.background}
                  />
                </InputGroup>
                <ErrorMessages errors={studentData.email.errors} />
              </Form.Group>
            </Form.Row>
            <Form.Row className="justify-content-around">
              <Form.Group as={Col} controlId="Password">
                <Form.Label>
                  <strong>Password</strong>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">
                      <FontAwesomeIcon icon={faUnlockAlt} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    onChange={validateInput}
                    onBlur={validateInput}
                    name="password"
                    className={studentData.username.background}
                  />
                </InputGroup>
                <ErrorMessages errors={studentData.username.errors} />
              </Form.Group>
            </Form.Row>
            <Form.Row className="justify-content-around">
              <Form.Group as={Col} controlId="Password">
                <Form.Label>
                  <strong>Confirm Password</strong>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    onChange={validateInput}
                    onBlur={validateInput}
                    name="passwordConfirm"
                    className={studentData.username.background}
                  />
                </InputGroup>
                <ErrorMessages errors={studentData.username.errors} />
              </Form.Group>
            </Form.Row>
            <Form.Row className="justify-content-around">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Pick an imgae</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </Form.Row>
            <Form.Row className="justify-content-center">
              <Col md="auto">
                <strong>Gener</strong>
              </Col>
              <Col>
                <Form.Row className="justify-content-around">
                  <div className="mb-3">
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid />
                      <Form.Check.Label>FPS</Form.Check.Label>
                    </Form.Check>
                  </div>
                  <div className="mb-3">
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid />
                      <Form.Check.Label>FPS</Form.Check.Label>
                    </Form.Check>
                  </div>
                  <div className="mb-3">
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid />
                      <Form.Check.Label>FPS</Form.Check.Label>
                    </Form.Check>
                  </div>
                  <div className="mb-3">
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid />
                      <Form.Check.Label>FPS</Form.Check.Label>
                    </Form.Check>
                  </div>
                </Form.Row>
                <Form.Row className="justify-content-around">
                  <div className="mb-3">
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid />
                      <Form.Check.Label>FPS</Form.Check.Label>
                    </Form.Check>
                  </div>
                  <div className="mb-3">
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid />
                      <Form.Check.Label>FPS</Form.Check.Label>
                    </Form.Check>
                  </div>
                  <div className="mb-3">
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid />
                      <Form.Check.Label>FPS</Form.Check.Label>
                    </Form.Check>
                  </div>
                  <div className="mb-3">
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" isValid />
                      <Form.Check.Label>FPS</Form.Check.Label>
                    </Form.Check>
                  </div>
                </Form.Row>
              </Col>
            </Form.Row>
            <Row className="justify-content-end">
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
