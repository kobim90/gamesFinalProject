import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faChartLine,
  faArrowUp,
  faStar,
  faImages,
} from "@fortawesome/free-solid-svg-icons";

import { getAllGamesApi, getSortedScoreDate } from "../DAL/api";

import GCard from "./card";
// import SearchBar from "./search"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import SearchCard from "./searchCard";
import AOS from 'aos';
import 'aos/dist/aos.css'
import "./home.css";

function Home() {
  const [games, setGames] = useState([]);
  const [tableGames, setTableGames] = useState([]);
  const [cardGames1, setCardGames1] = useState([]);
  const [cardGames2, setCardGames2] = useState([]);
  // const [cardGames3, setCardGames3] = useState([]);
  const [activeCol, setActiveCol] = useState(["activeTable", ""]);
  const [orederDirection, setOrderDirection] = useState({
    score: { direction: "desc", arrow: faArrowDown },
    releaseDate: { direction: "desc", arrow: faArrowDown },
  });
  const [screenshots, setScreenshots] = useState([
    Math.floor(Math.random() * 20),
    Math.floor(Math.random() * 20),
    Math.floor(Math.random() * 20),
  ]);

  function randomScreenshots() {
    setScreenshots([
      Math.floor(Math.random() * 20),
      Math.floor(Math.random() * 20),
      Math.floor(Math.random() * 20),
    ]);
  }

  async function sort(name) {
    const dir = { name: name, direction: "" };
    if (name === "score") {
      setActiveCol(["activeTable", ""]);
      if (orederDirection[name].direction === "desc") {
        setOrderDirection({
          ...orederDirection,
          [name]: { direction: "asc", arrow: faArrowUp },
        });
        dir.direction = "asc";
      } else {
        setOrderDirection({
          ...orederDirection,
          [name]: { direction: "desc", arrow: faArrowDown },
        });
        dir.direction = "desc";
      }
    } else {
      setActiveCol(["", "activeTable"]);
      if (orederDirection[name].direction === "desc") {
        setOrderDirection({
          ...orederDirection,
          [name]: { direction: "asc", arrow: faArrowUp },
        });
        dir.direction = "asc";
      } else {
        setOrderDirection({
          ...orederDirection,
          [name]: { direction: "desc", arrow: faArrowDown },
        });
        dir.direction = "desc";
      }
    }
    const games = await getSortedScoreDate(name, dir.direction);
    setTableGames([...games]);
  }

  useEffect(() => {
    (async function fetchData() {
      const games = await getAllGamesApi();
      const tableGames = await getSortedScoreDate(
        "score",
        orederDirection.score.direction
      );
      setGames(games);
      setCardGames1(games.slice(0, 6));
      setCardGames2(games.slice(6, 12));
      // setCardGames3(games.slice(8, 12));
      setTableGames(tableGames);
      randomScreenshots();
      // AOS.init({duration: 3000});
    })();
  }, []);
 
console.log(games);
  return (
    <Container fluid>
      <Container className="main">
        {/* <SearchBar class="justify-content-center w-75 mx-auto"/> */}
       

        <h5 className="mt-3">
          <FontAwesomeIcon icon={faStar} /> Featured
        </h5>

        <hr></hr>
        <Row className="recommended-row justify-content-center" >
          <Carousel variant="dark" className="recommended-carousel">
            <Carousel.Item className="recommended-item">
              <Row className="align-items-center justify-content-center inner-carousel-row">
                {cardGames1.length > 0 &&
                  cardGames1.map((game, index) => (
                    <Col lg="4" sm="12" key={index}>
                      <GCard game={game} />
                    </Col>
                  ))}
              </Row>
            </Carousel.Item>
            <Carousel.Item className="recommended-item">
              <Row className="align-items-center justify-content-center inner-carousel-row">
                {cardGames2.length > 0 &&
                  cardGames2.map((game, index) => (
                    <Col lg="4" sm="12" key={index}>
                      <GCard game={game} />
                    </Col>
                  ))}
              </Row>
            </Carousel.Item>
            {/* <Carousel.Item className="recommended-item">
              <Row className="align-items-center justify-content-center inner-carousel-row">
                {cardGames3.map((game, index) => (
                  <Col lg="5" sm="12" key={index}>
                    <GCard game={game} />
                  </Col>
                ))}
              </Row>
            </Carousel.Item> */}
          </Carousel>
        </Row>
        <Row className="table-sort container justify-content-center">
          <ListGroup variant="flush" className="table-sort-items">
            <ListGroup.Item>
              <Row className="table-row justify-content-around">
                <Col lg={3} xs="2">
                  <FontAwesomeIcon icon={faChartLine} />
                  <h4 style={{ display: "inline" }}> Discover Games</h4>
                </Col>
                <Col lg="3" xs="2">
                  <FontAwesomeIcon icon={orederDirection.releaseDate.arrow} />
                  <button
                    onClick={() => sort("releaseDate")}
                    className={`table-btn ${activeCol[1]}`}
                  >
                    <h4 style={{ display: "inline" }}>Release Date</h4>
                  </button>
                </Col>
                <Col lg="4" xs="2" className="text-right">
                  <FontAwesomeIcon icon={orederDirection.score.arrow} />
                  <button
                    onClick={() => sort("score")}
                    className={`table-btn ${activeCol[0]}`}
                  >
                    <h4 style={{ display: "inline" }}>Highest Rated </h4>
                  </button>
                </Col>
              </Row>
            </ListGroup.Item>

            {tableGames.map((game, index) => (
              <ListGroup.Item className="table-item mx-auto" key={index}>
                <Row className="align-items-center justify-content-center">
                  <Col lg="1" className="nums">
                    <strong>#{index + 1}</strong>
                  </Col>
                  <Col>
                    <SearchCard game={game} />
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Row>
        <h5>
          <FontAwesomeIcon icon={faImages} /> Screenshots
        </h5>
        <hr></hr>
        <Row className="justify-content-center carousel-row" >
       
          <Carousel variant="dark" className="main-carousel">
            <Carousel.Item>
              <img
                className="d-block"
                src={games.length ? games[screenshots[0]].screenshot1 : ""}
                alt="First slide"
              />
              <Carousel.Caption className="carusel-description">
                <h3>{games.length ? games[screenshots[0]].gameName : ""}</h3>
                <p>
                  {games.length
                    ? `${games[screenshots[0]].publisher} ${
                        games[screenshots[0]].releaseDate
                      }`
                    : ""}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="carusel-description">
              <img
                className="d-block"
                src={games.length ? games[screenshots[1]].screenshot1 : ""}
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>{games.length ? games[screenshots[1]].gameName : ""}</h3>
                {games.length
                  ? `${games[screenshots[1]].publisher} ${
                      games[screenshots[1]].releaseDate
                    }`
                  : ""}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="carusel-description">
              <img
                className="d-block"
                src={games.length ? games[screenshots[2]].screenshot1 : ""}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>{games.length ? games[screenshots[2]].gameName : ""}</h3>
                {games.length
                  ? `${games[screenshots[2]].publisher} ${
                      games[screenshots[2]].releaseDate
                    }`
                  : ""}
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
      </Container>
    </Container>
  );
}

export default Home;
