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
import Complete from "../Complete";
import { getGenresApi } from "../../DAL/api";

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
  const [registred, setRegistred] = useState("");

  async function entry(userData) {
    const formData = new FormData();
    for (const key in userData) {
      key !== "img"
        ? formData.append(key, userData[key].value)
        : formData.append("img", img);
    }
    formData.append("genres", genres);
    const test = await postRegister(formData);
    setRegistred(<Complete msg="Registration" />);
  }

  function updatGenres({ target: { value, checked } }) {
    const newGenres = [...genres];
    if (checked) {
      newGenres.push(value);
    } else {
      const index = newGenres.findIndex((genre) => genre === value);
      newGenres.splice(index, 1);
    }
    setGenres(newGenres);
  }

  function checkImg(event) {
    validateInput(event);
    setImg(event.target.files[0]);
  }

  const validateInput = async (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const [showErrors, background] = await validationChecks(
      name,
      value,
      userData,
      "register"
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
      {!registred ? (
        <>
          <Row className="text-center">
            <Col>
              <h1 className="h1-register">Welcome!</h1>
              <h6>Hello Gamer! Please fill in your details</h6>
            </Col>
          </Row>
          <hr></hr>
          <Row className="justify-content-center">
            <Col lg="5">
              <Form
                onSubmit={onSubmit}
                enctype="multipart/form-data"
                className="reg-form"
              >
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
                <GenreCheckbox
                  validateInput={updatGenres}
                  checked={[]}
                  data={getGenresApi}
                  name="Favorite Genres"
                />
                <Row className="justify-content-end">
                  <Col lg="5" className="d-flex justify-content-end">
                    <Button
                      type="submit"
                      variant="outline-danger"
                      className="submit-btn"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </>
      ) : (
        <h3>{registred}</h3>
      )}
    </Container>
  );
}

export default Register;
