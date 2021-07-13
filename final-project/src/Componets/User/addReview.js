import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { getAllGamesApi , getTagsApi} from "../../DAL/api";
import { useState, useEffect } from "react";

function AddReview(props) {
  const [games, setGames] = useState([]);
  const [tags, setTags] = useState([])

  useEffect(() => {
    (async function getData() {
      const games = await getAllGamesApi();
      const tags = await getTagsApi();
      setGames(games);
      setTags(tags)
    })();
  }, []);

  return (
    <Container>
      <Form.Group controlId="pick a game" as={Row} className="justify-content-center">
        <Col lg="2">
          <Form.Label>
            <strong>Pick a game:</strong>
          </Form.Label>
        </Col>
        <Col lg="6">
          <Form.Control as="select" defaultValue="Choose...">
            <option>Choose...</option>
            {games.map((game, index) => (
              <option key={index} value={game.gameID}>
                {game.gameName}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group controlId="reviewTitle" as={Row} className="justify-content-center">
        <Col lg="2">
          <Form.Label>
            <strong>Review Title:</strong>
          </Form.Label>
        </Col>
        <Col lg="6">
          <Form.Control type="text" placeholder="title here.." />
        </Col>
      </Form.Group>
      <Form.Group controlId="reviewTags" as={Row} className="justify-content-center">
        <Col lg="2">
          <Form.Label>
            <strong>My review tags:</strong>
          </Form.Label>
        </Col>
        <Col lg="6">
          {
              tags.map( (tag,index) => (
                <Form.Check inline type="checkbox" label={tag.tagName} key={index} value={tag.tagID}/>
              ))
          }
        </Col>
      </Form.Group>
      <Form.Group controlId="reviewBody" as={Row} className="justify-content-center">
        <Col lg="2">
          <Form.Label>
            <strong>Review body:</strong>
          </Form.Label>
        </Col>
        <Col lg="6">
        <Form.Control as="textarea" rows={5} />
        </Col>
      </Form.Group>
      <Form.Group controlId="conculsion" as={Row} className="justify-content-center">
        <Col lg="2">
          <Form.Label>
            <strong>Conclusion:</strong>
          </Form.Label>
        </Col>
        <Col lg="6">
          <Form.Control type="text" />
        </Col>
      </Form.Group>
      <Form.Group controlId="score" as={Row} className="justify-content-center">
        <Col lg="2">
          <Form.Label>
            <strong>Score:</strong>
          </Form.Label>
        </Col>
        <Col lg="6">
          <Form.Control type="number" min="0" max="10"/>
        </Col>
      </Form.Group>
    </Container>
  );
}

export default AddReview;
