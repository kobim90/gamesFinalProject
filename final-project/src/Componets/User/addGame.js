import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import GenreCheckbox from "../form/genreCheckbox";
import TextInput from "../form/textInput";
import { getGenresApi, getPlatform } from "../../DAL/api";
import {
    faUser,
    faMailBulk,
    faUnlockAlt,
    faLock,
    faGamepad
  } from "@fortawesome/free-solid-svg-icons";
import "./addGame.css"

function AddGame(params) {
    const [genres, setGenres] = useState([]);
    const [gameData, setGameData] = useState({
        gameName: {
            value: "",
            errors: []
        },
        publisher: {
            value: "",
            errors: []
        },
        date: {
            value: "",
            errors: []
        },
        description: {
            value: "",
            errors: []
        },
    })
    
    const validateInput = () => {};
    function updatGenres({ target: { value, checked} }) {
        const newGenres = [...genres];
        if (checked) {
          newGenres.push(value)
        } else {
          const index = newGenres.findIndex((genre) => genre === value);
          newGenres.splice(index, 1)
        }
        setGenres(newGenres);
      }

    // const inputArr = [
    //     {
    //       label: "Enter Game Name",
    //       name: "gameName",
    //       type: "text",
    //       validateInput: validateInput,
    //       background: "",
    //       errors: gameData.gameName.errors,
    //       icon: faGamepad,
    //     },
    //     {
    //       label: "Enter Publisher",
    //       name: "publisher",
    //       type: "text",
    //       validateInput: validateInput,
    //       background: "",
    //       errors: gameData.publisher.errors,
    //       icon: faMailBulk,
    //     },
    //     {
    //       label: "Enter Password",
    //       name: "password",
    //       type: "password",
    //       validateInput: validateInput,
    //       background: userData.password.background,
    //       errors: userData.password.errors,
    //       icon: faUnlockAlt,
    //     },
    //     {
    //       label: "ReEnter Password",
    //       name: "passwordConfirm",
    //       type: "password",
    //       validateInput: validateInput,
    //       background: userData.passwordConfirm.background,
    //       errors: userData.passwordConfirm.errors,
    //       icon: faLock,
    //     },
    //   ];
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return <>
    <h1 className="h1-register">Welcome Admin</h1>
    <Row className="text-center">
    <Col className="note-row">
    <small className="form-text text-danger"><strong>PLEASE NOTE!</strong> this is a work in progress feature, fill in the fields exactly as in the placeholder, Thank you!</small>
    </Col>
    </Row>
    <Row className="justify-content-center">
        <Col lg="5">
          <Form onSubmit={onSubmit} enctype="multipart/form-data" className="reg-form">
            {/* {inputArr.map((input) => (
              <TextInput
                label={input.label}
                name={input.name}
                type={input.type}
                validateInput={input.validateInput}
                background={input.background}
                errors={input.errors}
                icon={input.icon}
              />
            ))} */}
            {/* <Form.Row className="justify-content-start">
              <Form.Group controlId="formFile" className="mb-3" as={Col}>
                <Form.Label>
                  <strong>Pick an imgae</strong>
                </Form.Label>
                <Form.Control type="file" onChange={checkImg} name="img" />
                <ErrorMessages errors={userData.img.errors} />
              </Form.Group>
            </Form.Row> */}
            <GenreCheckbox validateInput={updatGenres} checked={[]} data={getPlatform} name="Game Platforms"/>
            <GenreCheckbox validateInput={updatGenres} checked={[]} data={getGenresApi} name="Game Genres"/>
            <Row className="justify-content-end">
              <Col lg="5" className="d-flex justify-content-end">
              <Button type="submit" variant="outline-info" className="submit-btn">
                Submit
              </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
}

export default AddGame;