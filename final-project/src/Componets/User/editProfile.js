import { useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GCard from "../card";
import Cookies from "js-cookie";
import ErrorMessages from "../form/ErrorMsg";
import TextInput from "../form/textInput";
import GenreCheckbox from "../form/genreCheckbox";
import { validationChecks, validationObj } from "../form/validations";
import Register from "../form/Register";
import { NavLink } from "react-router-dom";

import {
  faEdit,
  faTrashAlt,
  faMailBulk,
  faUnlockAlt,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { getUserProfileData } from "../../DAL/api";
import "./profileStyle.css";

function EditProfile() {
  const [data, setData] = useState({
    user: [],
    genres: [],
    reviews: [],
    games: [],
  });

  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState({
    img: { ...validationObj["img"] },
    email: { ...validationObj["email"]},
    password: { ...validationObj["password"], value: "placeHolder1" },
    passwordConfirm: { ...validationObj["passwordConfirm"], value: "placeHolder1"},
  });

  const [img, setImg] = useState("");
  const [genres, setGenres] = useState([]);

  async function entry(userData) {
    const formData = new FormData();
    for (const key in userData) {
      key !== "img"
        ? formData.append(key, userData[key].value)
        : formData.append("img", img);
    }
    formData.append("genres", genres);
    // const test = await postRegister(formData);
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

  useEffect(() => {
    (async function getData() {
      const data = await getUserProfileData();
      setData(data);
    })();
  }, []);
  return (
    <>
      <Row className="justify-content-around edit-row">
        <Col className="user-profile" lg="3">
          <h5>My Profile:</h5>
          <hr className="profile-hr"></hr>
          <Form onSubmit={onSubmit} enctype="multipart/form-data">
            <Button
              variant="outline-info"
              className="profile-btn"
              onClick={() => (edit ? setEdit(false) : setEdit(true))}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            {edit ? (
              <>
                <Form.Row className="justify-content-start">
                  <Form.Group controlId="formFile" className="mb-3" as={Col}>
                    <Form.Label>
                      <strong>Pick an imgae</strong>
                    </Form.Label>
                    <Form.Control type="file" onChange={checkImg} name="img" />
                    <ErrorMessages errors={userData.img.errors} />
                  </Form.Group>
                </Form.Row>
                <TextInput
                  label="Email"
                  name="email"
                  type="text"
                  validateInput={validateInput}
                  background={userData.email.background}
                  errors={userData.email.errors}
                  icon={faMailBulk}
                  defaultValue={data.user.length ? data.user[0].email : ""}
                />
                <TextInput
                  label="Password"
                  name="password"
                  type="password"
                  validateInput={validateInput}
                  background={userData.password.background}
                  errors={userData.password.errors}
                  icon={faUnlockAlt}
                  defaultValue={"placeHolder1"}
                />
                <TextInput
                  label="Confirm password"
                  name="passwordConfirm"
                  type="password"
                  validateInput={validateInput}
                  background={userData.password.background}
                  errors={userData.password.errors}
                  icon={faLock}
                  defaultValue={"placeHolder1"}
                />
                <GenreCheckbox
                  validateInput={updatGenres}
                  checked={data.genres}
                />
                <Row className="justify-content-center">
                  <Button
                    variant="outline-secondary"
                    onClick={() => setEdit(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="outline-info" type="submit">
                    Save
                  </Button>
                </Row>
              </>
            ) : (
              <>
                <Row>
                  <Image
                    className="profile-pic"
                    src={data.user.length ? data.user[0].img : ""}
                    roundedCircle
                    fluid
                  />
                </Row>
                <Row>
                  <Col lg="4">Username:</Col>
                  <Col lg="8">
                    {data.user.length ? data.user[0].username : ""}
                  </Col>
                </Row>
                <Row>
                  <Col lg="4">Email:</Col>
                  <Col lg="8">{data.user.length ? data.user[0].email : ""}</Col>
                </Row>
                <Row>
                  <Col lg="4">Password:</Col>
                  <Col lg="8">*********</Col>
                </Row>
                <Row>
                  <Col lg="4">Genres:</Col>
                  <Col lg="8">
                    {data.genres.map((genre) => `${genre.genreName}, `)}
                  </Col>
                  {/* <Button variant="outline-info">Edit</Button> */}
                </Row>
              </>
            )}
          </Form>
        </Col>

        <Col className="user-gameReviews" lg="8">
          <h5>Edit Games/Reviews:</h5>
          <hr className="profile-hr"></hr>
          <Row className="justify-content-around">
            {/* <Col lg="10"> */}

            {data.games.map((game) => (
              <>
                <Col lg="5" >
                  <Row className="justify-content-center align-items-center btn-row">
                    <Col lg="2" md="1" xs="2" className="profile-title-col ">
                      {/* <FontAwesomeIcon icon={faGamepad} /> */}
                      Game:
                    </Col>
                    <Col lg="2" md="1" xs="1" className="profile-btn-col">
                      <Button variant="secondary" className="profile-btn">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </Col>
                    <Col lg="2" md="2" xs="2" className="profile-title-col">
                      {/* <FontAwesomeIcon icon={faFileSignature} /> */}
                      Review:
                    </Col>
                    <Col lg="3" md="3" xs="3" className="profile-btn-col">
                      <Button variant="secondary" className="profile-btn">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                      <NavLink to={`/user/editReview/${data.reviews.find(review => review.gameID === game.gameID).reviewID}`}>
                      {/* <Button variant="info" className="profile-btn"> */}
                        <FontAwesomeIcon icon={faEdit} />
                      {/* </Button> */}
                      </NavLink>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <GCard game={game} />
                  </Row>
                </Col>
              </>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default EditProfile;
