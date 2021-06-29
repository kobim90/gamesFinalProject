import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindows,
  faApple,
  faLinux,
} from "@fortawesome/free-brands-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

import "./searchCardStyle.css";

function SearchCard(props) {

  return (
    <Card className="search-card">
      <Card.Body>
        <Row className="card-info justify-content-around items-align-center">
            <Col lg="4">
            <Card.Img src={`${props.game.coverImg}`} className="search-img" />
            </Col>
            <Col className="d-flex align-items-center">
            <Card.Title>{`${props.game.gameName}`}</Card.Title>
            </Col>
          <Col className="text-center d-flex align-items-center justify-content-center platform-col" lg="1">
            <span>
              <FontAwesomeIcon icon={faWindows} /> &nbsp;
            </span>

            <span>
              <FontAwesomeIcon icon={faApple} /> &nbsp;
            </span>
          
            <span>
              <FontAwesomeIcon icon={faLinux} /> &nbsp;
            </span>
          </Col>
          <Col className="text-right d-flex align-items-center justify-content-center">
            <Badge bg="info">Overall 90</Badge>{" "}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default SearchCard;
