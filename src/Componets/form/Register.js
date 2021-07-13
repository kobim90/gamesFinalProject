import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { validationObj, validationChecks } from "./validations";
import GenreCheckbox from "./genreCheckbox";
import TextInput from "./textInput";
import ErrorMessages from "./ErrorMsg";
import { postRegister } from "../../DAL/api";

import {
  faUser,
  faMailBulk,
  faUnlockAlt,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

function Register(params) {
  const [userData, setUserData] = useState({ ...validationObj });
  const [genres, setGenres] = useState([]);
  const [img, setImg] = useState("");
  const [registred, setRegistred] = useState("")

  async function entry(userData) {
    const formData = new FormData();
    for (const key in userData) {
      key !== "img"
        ? formData.append(key, userData[key].value)
        : formData.append("img", img);
    }
    formData.append("genres", genres);
    const test = await postRegister(formData);
    setRegistred(`Registration Complete! You can now login ${userData.username.value}`)

  }

  function updatGenres({ target: { value, checked, name } }) {
    const newGenres = [...genres];
    if (checked) {
      const index = newGenres.findIndex((genre) => genre === value);
      index !== -1 ? (newGenres[index] = 0) : newGenres.push(value);
    } else {
      const index = newGenres.findIndex((genre) => genre === value);
      newGenres[index] = 0;
    }
    const final = [];
    newGenres.forEach((genre) => (genre ? final.push(genre) : ""));
    setGenres(final);
  }

  function checkImg(event) {
    validateInput(event);
    setImg(event.target.files[0]);
  }

const validateInput = async (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const [showErrors, background] = await validationChecks(name, value, userData, "register");
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
    let errorsCount = 0;
    for (const key in userData) {
      validateInput({ target: { name: key, value: userData[key].value } });
      if (userData[key].errors.length > 0 || !userData[key].value) {
        errorsCount++;
      }
    }
    console.log(errorsCount);
    if (!errorsCount) {
      entry(userData);
    }
  };

  return (
    <Container className="main">
      {
        !registred ? (
          <>
          <Row className="text-center">
        <Col>
          <h1>Welcome!</h1>
          <p>Hello Gamer! Please fill in your details</p>
        </Col>
      </Row>
      <hr></hr>
      <Row className="justify-content-center">
        <Col lg="5">
          <Form onSubmit={onSubmit} enctype="multipart/form-data">
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
                <Form.Control type="file" onChange={checkImg} name="img" />
                <ErrorMessages errors={userData.img.errors} />
              </Form.Group>
            </Form.Row>
            <GenreCheckbox validateInput={updatGenres} checked={[]}/>
            <Row className="justify-content-center">
              <Button type="submit" variant="outline-info">
                Submit
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
      </>
        ) : (
          <h3>{registred}</h3>
        )
      }
      
    </Container>
  );
}

export default Register;
