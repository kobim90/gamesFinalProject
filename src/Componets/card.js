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

import "./cardStyle.css";

function GCard(props) {
  const [style, setStyle] = useState("none");

  return (
    <Card className="regular-card">
      <Card.Img variant="top" src={`${props.game.coverImg}`} />
      <Card.Body
        onMouseEnter={(e) => {
          setStyle("block");
        }}
        onMouseLeave={(e) => {
          setStyle("none");
        }}
      >
        <Card.Title>{`${props.game.gameName}`}</Card.Title>
        <Row className="card-info">
          <Col>
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
          <Col className="text-right">
            <Badge bg="info">Overall 90</Badge>{" "}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <span style={{ display: style}}>
           <FontAwesomeIcon icon={faPlusCircle} size="1x" />  Add
          </span>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default GCard;
