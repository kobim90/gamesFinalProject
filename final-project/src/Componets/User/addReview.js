import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ErrorMessages from "../form/ErrorMsg";
import {
  getGamesToReview,
  getTagsApi,
  postReview,
  getReview,
  putReview,
} from "../../DAL/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AddReview(props) {
  const { reviewId } = useParams();
  const [games, setGames] = useState([]);
  const [tags, setTags] = useState([]);
  const [reviewData, setReviewData] = useState({
    gameID: {
      value: 0,
      errors: [],
      required: true,
    },
    title: {
      max: 100,
      value: "",
      errors: [],
      required: true,
    },
    body: {
      max: 2000,
      value: "",
      errors: [],
      required: true,
    },
    conclusion: {
      max: 400,
      value: "",
      errors: [],
      required: true,
    },
    score: {
      max: 10,
      value: "",
      errors: [],
      required: true,
    },
    tags: {
      value: [],
      errors: [],
      required: false,
    },
    visability: {
      value: 1,
      errors: [],
      required: false,
    },
  });
  const [count, setCount] = useState({
    title: 200,
    body: 2000,
    conclusion: 400,
  });

  function updateValAndCounter({ target: { name, value, checked } }) {
    if (reviewData[name].max) {
      const counter = { ...count };
      counter[name] = reviewData[name].max - value.length;
      setCount(counter);
    }
    update(name, value);
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
    let tags = [...reviewData.tags.value];
    if (checked) {
      tags.push(parseInt(value));
    } else {
      const index = tags.findIndex( tag => tag === value)
      tags.splice(index, 1)
    }
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
      } else if (name === "score" && value > reviewData[name].max) {
        showErrors.push(`${name} must be between 0-10`);
      }
    }
    return showErrors;
  }

  function update(name, value) {
    let showErrors = [];
    if (reviewData[name].required) {
      showErrors = validate(name, value);
    }

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
      if (reviewData[key].required) {
        update(key, reviewData[key]);
        if (reviewData[key].errors.length > 0 || !reviewData[key].value) {
          errorsCount++;
        }
      }
    }

    if (!errorsCount) {
      if (reviewId) {
        putReview(reviewData, reviewId);
      } 
      else postReview(reviewData);
    }
  };

  useEffect(() => {
    (async function getData() {
      const games = await getGamesToReview();
      const tags = await getTagsApi();
      const reviewEditData = reviewId ? await getReview(reviewId) : "";
      if (reviewEditData) {
        for (const name in reviewData) {
          setReviewData((prevData) => ({
            ...prevData,
            [name]: {
              ...reviewData[name],
              value: reviewEditData[name],
            },
          }));
        }
      }
      setGames(games);
      setTags(tags);
    })();
  }, []);

  return (
    <Container>
      <h1>Let us know what you think!</h1>
      <Form onSubmit={onSubmit}>
        {reviewId ? (
          ""
        ) : (
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
                name="gameID"
                onChange={updateValAndCounter}
                defaultValue="0"
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
        )}
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
              onChange={updateValAndCounter}
              name="title"
              value={reviewData.title.value}
              defaultValue=""
            />
            <small>Characters left: {count.title}</small>
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
                defaultChecked={
                  // reviewData.tags.value.length ? 
                  reviewData.tags.value.find((val) => val === tag.tagID)
                      ? true
                      : false
                    // : false
                }
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
              onChange={updateValAndCounter}
              name="body"
              value={reviewData.body.value}
              defaultValue=""
            />
            <small>Characters left: {count.body}</small>
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
              onChange={updateValAndCounter}
              name="conclusion"
              value={reviewData.conclusion.value}
              defaultValue=""
            />
            <small>Characters left: {count.conclusion}</small>
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
              onChange={updateValAndCounter}
              // defaultValue={editData ? editData.score : ""}
              value={reviewData.score.value}
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
