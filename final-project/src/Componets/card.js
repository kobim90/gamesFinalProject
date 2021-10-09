import { useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindows,
  faApple,
  faLinux,
} from "@fortawesome/free-brands-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { NavLink} from "react-router-dom";


import "./cardStyle.css";

function GCard(props) {
  const [style, setStyle] = useState("none");
  const platform = {
    "Windows": faWindows,
    "OSX": faApple,
    "Linux": faLinux
  }

  return (
    <NavLink to={`/game/${props.game.gameID}`}>
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
            {
              props.game.platform.map( (plat, index) => (
                <span key={index}>
                <FontAwesomeIcon icon={platform[plat.name]} /> &nbsp;
              </span>
              ))
            }
          </Col>
          <Col className="text-right">
           <strong className="score">{isNaN(props.game.score) ? props.game.score : `Score ${(Math.round(props.game.score * 10) / 10)}`}</strong>
          </Col>
        </Row>
      </Card.Body>
    </Card>
    </NavLink>
  );
}

export default GCard;
