import { useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorMessages from "../form/ErrorMsg";
import TextInput from "../form/textInput";
import GenreCheckbox from "../form/genreCheckbox";
import { validationChecks, validationObj } from "../form/validations";
import { putRegister } from "../../DAL/api";
import { getGenresApi } from "../../DAL/api";
import AOS from 'aos';
import 'aos/dist/aos.css'


import {
  faEdit,
  faTrashAlt,
  faMailBulk,
  faUnlockAlt,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

function Profile(props) {
  const [editData, setEditData] = useState({
    email: { ...validationObj.email },
    img: { ...validationObj.img },
  });
  const [img, setImg] = useState("");
  const [genres, setGenres] = useState([]);

  function checkImg(event) {
    validateInput(event);
    setImg(event.target.files[0]);
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

  const validateInput = async (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const [showErrors, background] = await validationChecks(
      name,
      value,
      editData,
      "edit"
    );
    setEditData((prevData) => ({
      ...prevData,
      [name]: {
        ...editData[name],
        background: background,
        value: value,
        errors: [...showErrors],
      },
    }));
  };

  useEffect(() => {
    if ( props.data.user.length) {
        setEditData({
            email: { ...validationObj.email, value: props.data.user[0].email },
            img: { ...validationObj.img, value: props.data.user[0].img },
          });
    }
    
    if (props.data.genres.length) {
      const genres = [];
      props.data.genres.map((genre) => genres.push(genre.genreID));
      setGenres(genres);
    }
    
  }, [props.editShow]);

  const entry = async () => {
    const formData = new FormData();
    for (const key in editData) {
      key !== "img"
        ? formData.append(key, editData[key].value)
        : formData.append("img", img);
    }
    formData.append("genres", genres);
    const test = await putRegister(formData);
    props.showEdit(false)  
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let errorsCount = 0;
    for (const key in editData) {
      validateInput({ target: { name: key, value: editData[key].value } });
      if (editData[key].errors.length > 0 || !editData[key].value) {
        errorsCount++;
      }
    }

    if (!errorsCount) {
        entry()
    }
  };

  return (
    <>
    <div>
      <Button
        variant="outline-info"
        onClick={() => (props.editShow ? props.showEdit(false) : props.showEdit(true))}
        className="edit-btn"
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      {!props.editShow && props.data.user.length ? (
        <>
        <Row className="justify-content-center align-items-center">
            <Row className="justify-content-center img-row">
            <Col >
            <Image
              src={props.data.user[0].img}
              roundedCircle
              className="profile-img"
              fluid
            />
            </Col>
           
            </Row>
           </Row>
            <Row >
              <Col lg="3" className="field-row">
                <strong className="field">Username:</strong>
              </Col>
              <Col>{props.data.user[0].username}</Col>
            </Row>
            {/* <hr></hr> */}
            <Row >
              <Col lg="3" className="field-row">
                <strong className="field">Email:</strong>
              </Col>
              <Col>{props.data.user[0].email}</Col>
            </Row>
            {/* <hr></hr> */}
            <Row >
              <Col lg="3" className="field-row">
                <strong className="field">Genres:</strong>
              </Col>
              <Col>
                {props.data.genres.length
                  ? props.data.genres.map((genre, index) => <span key={index}>{genre.genreName}, </span>)
                  : "Edit and choose your favorite genres :)"}
              </Col>
            </Row>
            {/* <hr></hr> */}
        </>
      ) : props.data.user.length ? (
        <>
          <Form
            onSubmit={onSubmit}
            encType="multipart/form-data"
            className="reg-form"
          >
              <Row className="justify-content-center align-items-center">
                  <Col>
            <TextInput
              type="text"
              label="Email"
              placeholder=""
              validateInput={validateInput}
              name="email"
              background={editData.email.background}
              value={editData.email.value}
              icon={faMailBulk}
              errors={editData.email.errors}
            />
            <Row>
             <Form.Group controlId="formFile" className="mb-3" as={Col}>
              <Form.Label>
                <strong>Pick an imgae</strong>
              </Form.Label>
              <Form.Control type="file" onChange={checkImg} name="img" />
              <ErrorMessages errors={editData.img.errors} />
            </Form.Group>
            </Row>

            <GenreCheckbox
              validateInput={updatGenres}
              checked={props.data.genres}
              data={getGenresApi} name="Favorite Genres"
            />
 
 <Row className="justify-content-end">
              <Col lg="5" className="d-flex justify-content-end">
              <Button type="submit" variant="outline-info" className="submit-btn">
                Submit
              </Button>
              </Col>
            </Row>
            </Col>
            </Row>
          </Form>
        </>
      ) : (
        ""
      )}
      </div>
    </>
  );
}

export default Profile;
