import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindows,
  faApple,
  faLinux,
} from "@fortawesome/free-brands-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import "./cardStyle.css"

function GCard(props) {
  return (
    <Card>
      <Card.Img
        variant="top"
        src="https://images-3.gog-statics.com/0f8f8798c4512cc9aa1881a1f8672bc9598c7afb523e0e6120223d3dc697ddfe_product_tile_256.webp"
      />
      <Card.Body>
        <Card.Title>Game Title Here</Card.Title>
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
            <Badge bg="info">Overall 90</Badge>
            {" "}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default GCard;
