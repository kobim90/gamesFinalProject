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
import { NavLink } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'

import "./searchCardStyle.css";

function SearchCard(props) {
  const [style, setStyle] = useState("none");
  const platform = [faWindows, faApple, faLinux];

  useEffect(()=> {
    AOS.init({duration: 3000});
  }, [])

  return (
    <NavLink to={`/game/${props.game.gameID}`}>
      <Card className="search-card" data-aos="fade-right">
        <Card.Body>
          <Row className="card-info justify-content-between items-align-center">
            <Col lg="3" md="3" xs="3">
              <Card.Img src={`${props.game.coverImg}`} className="search-img"/>
            </Col>
            <Col className=" d-flex justify-content-center flex-column" md="5" xs="2">
              <Row>
                <Card.Title>{`${props.game.gameName}`}</Card.Title>
              </Row>
              <Row>
                <p className="publisher-date-row">
                  {props.game.publisher}, {props.game.releaseDate}
                </p>
              </Row>
            </Col>
            <Col
              className="text-center d-flex align-items-center justify-content-center platform-col"
              lg="1" xs="1"
            >
              {props.game.platform.map((plat, index) => (
                <span key={index}>
                  <FontAwesomeIcon icon={platform[plat.id - 1]} /> &nbsp;
                </span>
              ))}
            </Col>
            <Col
              className="text-right d-flex align-items-center justify-content-center"
              md="2"
              xs="2"
            >
              <strong className="score">
                {isNaN(props.game.score)
                  ? props.game.score
                  : `Score ${Math.round(props.game.score * 10) / 10}`}
              </strong>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </NavLink>
  );
}

export default SearchCard;
