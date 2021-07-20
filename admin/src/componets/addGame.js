import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert"
import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import AuthApi from "../DAL/auth";
import React from "react";
import { getGenrePlatforms, postGame } from "../DAL/api";

function AddGame() {
  const Auth = useContext(AuthApi);
  const [checkbox, setCheckbox] = useState({});
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [img, setImg] = useState({});
  const [alert, setAlert] = useState("")
  const [gameData, setGameData] = useState({
    title: { value: "" },
    publisher: { value: "" },
    description: { value: "" },
    date: { value: "" },
    system: { value: "" },
    processor: { value: "" },
    memory: { value: "" },
    graphics: { value: "" },
    directx: { value: "" },
    storage: { value: "" },
  });
  const system = [
    "System",
    "Processor",
    "Memory",
    "Graphics",
    "DirectX",
    "Storage",
  ];

  const controlCheckBox = ({ target: { value, checked, name } }) => {
    const newData = name === "genres" ? [...genres] : [...platforms];
    if (checked) {
      newData.push(parseInt(value));
    } else {
      const index = newData.findIndex((genre) => genre === value);
      newData.splice(index, 1);
    }
    name === "genres" ? setGenres(newData) : setPlatforms(newData);
  };

  const controlInput = ({ target: { value, name } }) => {
    setGameData({
      ...gameData,
      [name.toLowerCase()]: { value: value },
    });
  };

  const controlImg = ({ target: { files } }) => {
    setImg(files);
  };


  const logout = () => {
    Cookies.remove("user");
    Auth.setAuth(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in gameData) {
      formData.append(key, gameData[key].value);
    }
    for (const key in img) {
      if (key !== "length" && key !== "item") {
        formData.append(`images`, img[key]);
      }
    }
    formData.append('genres', genres)
    formData.append('platforms', platforms)
    const res = await postGame(formData);

    if (res.response) {
        setAlert(<Alert variant="success">Game added successfully! you will be logged out thank you :)</Alert>)
        setTimeout( () => {     
            logout()
        }, 4000)
        
    }
  };

  const getCheckbox = async () => {
    const data = await getGenrePlatforms();
    setCheckbox(data);
  };

  useEffect(() => {
    getCheckbox();
  }, []);


  return (
    <>
      <Button onClick={logout}>LOGOUT</Button>
      <Container>
          {alert}
        <Row className="text-center mb-4">
          <Col className="note-row">
            <h1 className="h1-register">Welcome Admin</h1>
            <small className="form-text text-danger">
              <strong>PLEASE NOTE!</strong> this is a work in progress feature,
              fill in the fields exactly as in the text bellow, Thank you!
            </small>
          </Col>
        </Row>
        <Form onSubmit={onSubmit}>
          <Form.Row>
            <h5>Game Details</h5>
          </Form.Row>
          <hr></hr>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridTitle">
              <Form.Label>Game Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                name="title"
                onChange={controlInput}
              />
              <Form.Text>
                <small>NOT longer than 100 letters!</small>
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPublisher">
              <Form.Label>Publisher</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Publisher"
                name="publisher"
                onChange={controlInput}
              />
              <Form.Text>
                <small>NOT longer than 100 letters!</small>
              </Form.Text>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Leave description here"
                rows={10}
                name="description"
                onChange={controlInput}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row className="mb-4">
            <Form.Group as={Col} id="formGridCheckboxPlatforms">
              <Form.Row>
                <Form.Label className="mr-2">Platforms</Form.Label>
              </Form.Row>
              <Form.Row>
                {checkbox.platforms
                  ? checkbox.platforms.map((plat, index) => (
                      <>
                        <Form.Check
                          type="checkbox"
                          id={`${plat.Name}-checkbox${index}`}
                        >
                          <Form.Check.Input
                            type="checkbox"
                            key={index}
                            value={parseInt(plat.id)}
                            name="platforms"
                            onChange={controlCheckBox}
                          />
                          <Form.Check.Label className="mr-2">
                            {plat.Name}
                          </Form.Check.Label>
                        </Form.Check>
                      </>
                    ))
                  : ""}
              </Form.Row>
            </Form.Group>

            <Form.Group as={Col} id="formGridCheckboxPlatforms">
              <Form.Row>
                <Form.Label className="mr-2">Platforms</Form.Label>
              </Form.Row>
              <Form.Row>
                {checkbox.platforms
                  ? checkbox.genres.map((plat, index) => (
                      <>
                        <Form.Check
                          type="checkbox"
                          id={`${plat.Name}-checkbox${index}`}
                        >
                          <Form.Check.Input
                            type="checkbox"
                            key={index}
                            value={parseInt(plat.id)}
                            name="genres"
                            onChange={controlCheckBox}
                          />
                          <Form.Check.Label className="mr-2">
                            {plat.Name}
                          </Form.Check.Label>
                        </Form.Check>
                      </>
                    ))
                  : ""}
              </Form.Row>
            </Form.Group>

            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Screenshots</Form.Label>
              <Form.Control type="file" multiple onChange={controlImg} />
              <Form.Text>
                <small>
                  Upload EXACTRLY 6 images! 1 cover img named cover size
                  256x117px
                </small>
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDate">
              <Form.Label>Release Date</Form.Label>
              <Form.Control type="date" name="date" onChange={controlInput} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <h5>System Requirements</h5>
          </Form.Row>
          <hr></hr>
          <Form.Row>
          {system.map((type,index) => (
            <>
                {
                    index < 3 ? <>
                        <Form.Group as={Col} controlId={`formGrid${type}`}>
                <Form.Label>{type}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter ${type}`}
                  name={type}
                  onChange={controlInput}
                  key={index}
                />
              </Form.Group>
                    </> : ""
                } 
            </>
          ))}
          </Form.Row>

          <Form.Row>
          {system.map((type,index) => (
            <>
                {
                    index > 2 ? <>
                        <Form.Group as={Col} controlId={`formGrid${type}`}>
                <Form.Label>{type}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter ${type}`}
                  name={type}
                  onChange={controlInput}
                  key={index}
                />
              </Form.Group>
                    </> : ""
                } 
            </>
          ))}
          </Form.Row>

          <Button variant="primary" type="submit" block>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default AddGame;
