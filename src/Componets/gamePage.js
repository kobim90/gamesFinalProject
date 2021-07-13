import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useParams } from "react-router-dom";
import { getAllGameDetailes } from "../DAL/api";
import Modal from "react-bootstrap/esm/Modal";
import Reviews from "./reviews";

import "./gamePage.css";

function GamePage(props) {
  const { gameId } = useParams();
  const [game, setGame] = useState({ genre: [], platform: [] });
  const [show, setShow] = useState(false);
  const [showPic, setShowPic] = useState("");

  const handleClose = (pic) => setShow(false);
  const handleShow = (pic) => {
    setShow(true);
    setShowPic(pic);
  };

  async function getData() {
    const game = await getAllGameDetailes(gameId);
    setGame(game);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      {}
      <Container className="main">
        <Row className="justify-content-center title">
          <div
            className="parallax d-flex align-items-center"
            style={{ backgroundImage: `url(${game.screenshot5})` }}
          >
            <h1 className="mx-auto game-header">{game.gameName}</h1>
          </div>
        </Row>
        <Row className="justify-content-around details-row">
          <Col lg="5">
            <h5>
              <strong>Description</strong>
            </h5>
            <hr></hr>
            <div className="desc">{game.description}</div>
          </Col>
          <Col lg="5">
            <h5>
              <strong>Game details</strong>
            </h5>
            <hr></hr>
            <Row>
              <Col lg="4" className="detail-field">
                Genre:
              </Col>{" "}
              <Col>
                {game.genre.map(
                  (g, index) =>
                    `${g.name} ${index !== game.genre.length - 1 ? "- " : ""}`
                )}
              </Col>
            </Row>
            <Row>
              <Col lg="4" className="detail-field">
                Platforms:
              </Col>
              <Col>
                {game.platform.map(
                  (p, index) =>
                    `${p.name} ${
                      index !== game.platform.length - 1 ? "- " : ""
                    }`
                )}
              </Col>
            </Row>
            <Row>
              <Col lg="4" className="detail-field">
                Release date:
              </Col>
              <Col>{game.releaseDate}</Col>
            </Row>
            <Row>
              <Col lg="4" className="detail-field">
                Company:
              </Col>
              <Col>{game.publisher}</Col>
            </Row>
            <Row>
              <Col lg="4" className="detail-field last">
                Size:
              </Col>
              <Col>{game.storage}</Col>
            </Row>
            <hr></hr>
            <h5>System requirements</h5>
            <Row>
              <Col lg="4" className="detail-field">
                System:
              </Col>
              <Col>{game.system}</Col>
            </Row>
            <Row>
              <Col lg="4" className="detail-field">
                Processor:
              </Col>
              <Col>{game.processor}</Col>
            </Row>
            <Row>
              <Col lg="4" className="detail-field">
                Memory:
              </Col>
              <Col>{game.memory}</Col>
            </Row>
            <Row>
              <Col lg="4" className="detail-field">
                Graphics:
              </Col>
              <Col>{game.graphics}</Col>
            </Row>
            <Row>
              <Col lg="4" className="detail-field">
                DirectX:
              </Col>
              <Col>{game.directx}</Col>
            </Row>
            <Row>
              <Col lg="4" className="detail-field">
                Storage:
              </Col>
              <Col>{game.storage}</Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center screen-row">
          <Col lg="11">
            {" "}
            <h5>Screenshots</h5>
            <hr></hr>
            <Modal
              show={show}
              onHide={handleClose}
              centered
              className="pic-modal"
              size="lg"
            >
              <Modal.Body>
                <img src={showPic} alt="pew pew" className="mx-auto"></img>
              </Modal.Body>
            </Modal>
            <Row className="justify-content-center">
              <Col className="screenshot-col">
                <img
                  src={game.screenshot1}
                  className="screenshot"
                  alt="pew pew"
                  onClick={() => handleShow(game.screenshot1)}
                ></img>
              </Col>
              <Col className="screenshot-col">
                <img
                  src={game.screenshot2}
                  className="screenshot"
                  alt="pew pew"
                  onClick={() => handleShow(game.screenshot2)}
                ></img>
              </Col>
              <Col className="screenshot-col">
                <img
                  src={game.screenshot3}
                  className="screenshot"
                  alt="pew pew"
                  onClick={() => handleShow(game.screenshot3)}
                ></img>
              </Col>
              <Col className="screenshot-col">
                <img
                  src={game.screenshot4}
                  className="screenshot"
                  alt="pew pew"
                  onClick={() => handleShow(game.screenshot4)}
                ></img>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="11">
            <h5>User reviews</h5>
            <hr></hr>
            <Reviews gameId={gameId}/>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default GamePage;
