import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faChartLine,
  faArrowUp,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import { getAllGamesApi, getSortedScoreDate } from "../DAL/api";

import GCard from "./card";
import SearchBar from "./search"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import SearchCard from "./searchCard";
import "./home.css";

function Home() {
  const [games, setGames] = useState([])
  const [tableGames, setTableGames] = useState([])
  const [cardGames1, setCardGames1] = useState([])
  const [cardGames2, setCardGames2] = useState([])
  const [cardGames3, setCardGames3] = useState([])
  const [activeCol, setActiveCol] = useState(["activeTable", ""])
  const [orederDirection, setOrderDirection] = useState({score: {direction: "desc", arrow: faArrowDown}, releaseDate: {direction: "desc", arrow: faArrowDown}})


  async function sort(name) {
    const dir = {name: name, direction: ""}
    if (name === "score") {
      setActiveCol(["activeTable", ""])
      if (orederDirection[name].direction === "desc") {
        setOrderDirection({...orederDirection, [name]:{direction: "asc", arrow: faArrowUp}})
        dir.direction = "asc"
      }else {
        setOrderDirection({...orederDirection, [name]:{direction: "desc", arrow: faArrowDown}})
        dir.direction = "desc"}
    }else {
      setActiveCol(["", "activeTable"])
      if (orederDirection[name].direction === "desc") {
        setOrderDirection({...orederDirection, [name]:{direction: "asc", arrow: faArrowUp}})
        dir.direction = "asc"
      }
      else {
        setOrderDirection({...orederDirection, [name]:{direction: "desc", arrow: faArrowDown}})
        dir.direction = "desc"}
      
    }
    const games = await getSortedScoreDate(name, dir.direction);
    setTableGames([...games])
  }

  useEffect( () => {
    (async function fetchData() {
      const games = await getAllGamesApi();
      const tableGames = await getSortedScoreDate("score", orederDirection.score.direction);
      setGames(games)
      setCardGames1(games.slice(0,4))
      setCardGames2(games.slice(4,8))
      setCardGames3(games.slice(8,12))
      setTableGames(tableGames)
    })()
  }, [])

  console.log(games);
  return (
    <Container fluid>
      <Container className="main">
        <SearchBar class="justify-content-center w-75 mx-auto"/>
        <Row className="justify-content-center carousel-row">
          <Carousel variant="dark" className="main-carousel">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://i1.wp.com/www.gamerfuzion.com/wp-content/uploads/2015/04/Star-Wars-Battlefront-PS4-Cover.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.mobygames.com%2Fimages%2Fcovers%2Fl%2F3907-doom-dos-front-cover.jpg&f=1&nofb=1"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pcgamesarchive.com%2Fwp-content%2Fuploads%2F2020%2F04%2FThe-Witcher-3.jpg&f=1&nofb=1"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>

        <h5>
          <FontAwesomeIcon icon={faStar} /> Recommended
        </h5>

        <hr></hr>
        <Row className="recommended-row justify-content-center">
          <Carousel variant="dark" className="recommended-carousel">
                <Carousel.Item className="recommended-item">
              <Row className="align-items-center justify-content-center inner-carousel-row">
                {
                (cardGames1.length > 0) && cardGames1.map( (game, index) => 
                  <Col lg="5" sm="12" key={index}>
                  <GCard game={game}/>
                  </Col>
                )
                  }
               </Row> 
            </Carousel.Item>
            <Carousel.Item className="recommended-item">
              <Row className="align-items-center justify-content-center inner-carousel-row">
                {
                (cardGames2.length > 0) && cardGames2.map( (game, index) => 
                  <Col lg="5" sm="12" key={index}>
                  <GCard game={game}/>
                  </Col>
                )
                  }
               </Row> 
            </Carousel.Item>
            <Carousel.Item className="recommended-item">
              <Row className="align-items-center justify-content-center inner-carousel-row">
                {
                cardGames3.map( (game, index) => 
                  <Col lg="5" sm="12" key={index}>
                  <GCard game={game}/>
                  </Col>
                )
                  }
               </Row> 
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row className="table-sort container justify-content-center">
          <ListGroup variant="flush" className="table-sort-items">
            <ListGroup.Item>
              <Row className="table-row justify-content-between">
                <Col lg={3}>
                  <FontAwesomeIcon icon={faChartLine} />
                  <h4 style={{ display: "inline" }}> Discover Games</h4>
                </Col>
                <Col lg="5">
                  <FontAwesomeIcon icon={orederDirection.releaseDate.arrow} />
                  <button onClick={() => sort("releaseDate")} className={`table-btn ${activeCol[1]}`}><h4 style={{ display: "inline" }} >Release Date</h4></button>
                </Col>
                <Col lg="4" className="text-right">
                  <FontAwesomeIcon icon={orederDirection.score.arrow} />
                  <button  onClick={() => sort("score")} className={`table-btn ${activeCol[0]}`}><h4 style={{ display: "inline" }} >Highest Rated</h4></button>
                </Col>
                
              </Row>
            </ListGroup.Item>
            
              {
                tableGames.map( (game, index) => (
                  <ListGroup.Item className="table-item mx-auto">
                    <SearchCard game={game} />
                    </ListGroup.Item>
                ))
              }
            
          </ListGroup>
        </Row>
      </Container>
    </Container>
  );
}

export default Home;
