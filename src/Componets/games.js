import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import SearchBar from "./search";
import GCard from "./card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import "./gamesStyle.css"
import { getAllGamesApi } from "../DAL/api";

function Games(props) {

  const [cardGames, setCardGames] = useState([])

  useEffect( () => {
    (async function fetchData() {
      const games = await getAllGamesApi();
      setCardGames(games)
    })()
    
  }, [])

  return (
    <Container className="main">
      <SearchBar />
      <Row>
        <Col>
          <h6>
            <FontAwesomeIcon icon={faFilter} /> Filters
          </h6>
        </Col>
        <Col>
          <h6>Everything</h6>
        </Col>

        <Col>
          <h6>New Releases</h6>
        </Col>

        <Col>
          <h6>Popular</h6>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col className="filter" lg="3">
          <Col className="d-flex flex-column">
            <h5>Gener</h5>
            <div className="mb-3">
              <Form.Check type="checkbox" id="default-checkbox" label="RPG" />
            </div>
            <div className="mb-3">
              <Form.Check type="checkbox" id="default-checkbox" label="FPS" />
            </div>
            <div className="mb-3">
              <Form.Check
                type="checkbox"
                id="default-checkbox"
                label="Action"
              />
            </div>
          </Col>
          <hr></hr>
          <Col className="d-flex flex-column">
            <h5>System</h5>
            <div className="mb-3">
              <Form.Check type="checkbox" id="default-checkbox" label="Windows" />
            </div>
            <div className="mb-3">
              <Form.Check type="checkbox" id="default-checkbox" label="OSX" />
            </div>
            <div className="mb-3">
              <Form.Check
                type="checkbox"
                id="default-checkbox"
                label="Linux"
              />
            </div>
          </Col>
        </Col>
        <Col className="games-list">
            <Row>
                {
                 cardGames.map( (game) => 
                    <Col lg="4" md="6" sm="1">
                    <GCard game={game} />
                    </Col>
                 )
                }
            </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Games;
