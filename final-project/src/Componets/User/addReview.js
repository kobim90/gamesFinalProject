import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ErrorMessages from "../form/ErrorMsg";
import { getGamesToReview, getTagsApi, postReview } from "../../DAL/api";
import { useState, useEffect } from "react";

function AddReview(props) {
  const [games, setGames] = useState([]);
  const [tags, setTags] = useState([]);
  const [reviewTags, setReviewTags] = useState([0, 0, 0, 0]);
  const [bodyCount, setBodyCount] = useState(2000);
  const [titleCount, setTitleCount] = useState(100);
  const [conclusionCount, setConclusionCount] = useState(400);
  const [reviewData, setReviewData] = useState({
    gameID: {
      value: "",
      errors: [],
    },
    title: {
      max: 100,
      value: "",
      errors: [],
    },
    body: {
      max: 2000,
      value: "",
      errors: [],
    },
    conclusion: {
      max: 400,
      value: "",
      errors: [],
    },
    score: {
      max: 10,
      value: "",
      errors: [],
    },
    tags: {
      value: [],
      errors: [],
    },
    visability: {
      value: 1,
      errors: [],
    },
  });

  function changeBcounter({ target: { value } }) {
    setBodyCount(2000 - value.length);
  }
  function changeTcounter({ target: { value } }) {
    setTitleCount(100 - value.length);
  }
  function changeCcounter({ target: { value } }) {
    setConclusionCount(400 - value.length);
  }

  function updateVisability({ target: { name, value, checked } }) {
    const val = checked ? 0 : 1;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: {
        ...reviewData[name],
        value: val,
      },
    }));
  }

  function updateTags({ target: { name, value, checked } }) {
    const tags = [...reviewTags];
    if (checked) {
      tags[value - 1] = value;
    } else tags[value] = 0;
    setReviewTags(tags);
    setReviewData({ ...reviewData, [name]: { value: tags } });
  }

  function validate(name, value) {
    const showErrors = [];
    if (!value) {
      showErrors.push(`${name} is required`);
    }
    if (reviewData[name].max) {
      if (value.length > reviewData[name].max) {
        showErrors.push(`${name} passed the max characters allowed`);
      }else if (name === "score" && value > reviewData[name].max) {
        showErrors.push(`${name} must be between 0-10`);
      }
    }
    return showErrors;
  }

  function update({ target: { name, value } }) {
    const showErrors = validate(name, value);
    setReviewData((prevData) => ({
      ...prevData,
      [name]: {
        ...reviewData[name],
        value: value,
        errors: [...showErrors],
      },
    }));
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let errorsCount = 0;
    for (const key in reviewData) {
      if (key !== "tags" && key !== "visability") {
        update({ target: { name: key, value: reviewData[key].value } });
        if (reviewData[key].errors.length > 0 || !reviewData[key].value) {
          errorsCount++;
        }
      }
    }
    
    if (!errorsCount) {
      postReview(reviewData)
    }
  };

  useEffect(() => {
    (async function getData() {
      const games = await getGamesToReview();
      const tags = await getTagsApi();
      setGames(games);
      setTags(tags);
    })();
  }, []);

  return (
    <Container>
      <h1>Let us know what you think!</h1>
      <Form onSubmit={onSubmit} enctype="multipart/form-data">
        <Form.Group
          controlId="pick a game"
          as={Row}
          className="justify-content-center"
        >
          <Col lg="2">
            <Form.Label>
              <strong>Pick a game:</strong>
            </Form.Label>
          </Col>
          <Col lg="4">
            <Form.Control
              as="select"
              defaultValue="0"
              name="gameID"
              onChange={update}
            >
              <option>Choose...</option>
              {games.map((game, index) => (
                <option key={index} value={game.gameID}>
                  {game.gameName}
                </option>
              ))}
            </Form.Control>
            <ErrorMessages errors={reviewData.gameID.errors} />
          </Col>
          <Col lg="2">
            <Form.Check
              inline
              type="checkbox"
              label="Private review"
              value={1}
              name="visability"
              onClick={updateVisability}
            />
          </Col>
        </Form.Group>
        <Form.Group
          controlId="reviewTitle"
          as={Row}
          className="justify-content-center"
        >
          <Col lg="2">
            <Form.Label>
              <strong>Review Title:</strong>
            </Form.Label>
          </Col>
          <Col lg="6">
            <Form.Control
              type="text"
              placeholder="title here.."
              onChange={changeTcounter}
              name="title"
              onBlur={update}
            />
            <small>Characters left: {titleCount}</small>
            <ErrorMessages errors={reviewData.title.errors} />
          </Col>
        </Form.Group>
        <Form.Group
          controlId="reviewTags"
          as={Row}
          className="justify-content-center"
        >
          <Col lg="2">
            <Form.Label>
              <strong>My review tags:</strong>
            </Form.Label>
          </Col>
          <Col lg="6">
            {tags.map((tag, index) => (
              <Form.Check
                inline
                type="checkbox"
                label={tag.tagName}
                key={index}
                value={tag.tagID}
                name="tags"
                onBlur={updateTags}
              />
            ))}
          </Col>
        </Form.Group>
        <Form.Group
          controlId="reviewBody"
          as={Row}
          className="justify-content-center"
        >
          <Col lg="2">
            <Form.Label>
              <strong>Review body:</strong>
            </Form.Label>
          </Col>
          <Col lg="6">
            <Form.Control
              as="textarea"
              rows={5}
              onChange={changeBcounter}
              name="body"
              onBlur={update}
            />
            <small>Characters left: {bodyCount}</small>
            <ErrorMessages errors={reviewData.body.errors} />
          </Col>
        </Form.Group>
        <Form.Group
          controlId="conculsion"
          as={Row}
          className="justify-content-center"
        >
          <Col lg="2">
            <Form.Label>
              <strong>Conclusion:</strong>
            </Form.Label>
          </Col>
          <Col lg="6">
            <Form.Control
              as="textarea"
              rows={2}
              onChange={changeCcounter}
              name="conclusion"
              onBlur={update}
            />
            <small>Characters left: {conclusionCount}</small>
            <ErrorMessages errors={reviewData.conclusion.errors} />
          </Col>
        </Form.Group>
        <Form.Group
          controlId="score"
          as={Row}
          className="justify-content-center"
        >
          <Col lg="2">
            <Form.Label>
              <strong>Score:</strong>
            </Form.Label>
          </Col>
          <Col lg="6">
            <Form.Control
              type="number"
              min="0"
              max="10"
              name="score"
              onBlur={update}
            />
            <ErrorMessages errors={reviewData.score.errors} />
          </Col>
        </Form.Group>
        <Row className="justify-content-center">
          <Button variant="outline-info" type="submit">
            Submit
          </Button>
        </Row>
      </Form>
    </Container>
  );
}

export default AddReview;
