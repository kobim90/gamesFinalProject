import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import SearchBar from "./search";
import GCard from "./card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css'
import "./gamesStyle.css";
import { getAllGamesApi, getGenresApi, getPlatform, getFilteredGenrePlatform, getSearchedGames } from "../DAL/api";

function Games(props) {
  const [cardGames, setCardGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [filter, setFilter] = useState({genres: {}, platforms: {}})
  const [allGames, setAllGames] = useState([])

  function setGamesBySearch(games) {
    setCardGames(games)
  }

  const resetGames = () => setCardGames(allGames)

  function filterFunc({ target: { value, checked, name } }) {
      const newGenres = { ...filter };
      console.log(newGenres);
      if (checked) newGenres[name][value] = true;
      else delete newGenres[name][value];
      setFilter(newGenres)
      fetchFilter(filter)
  }

  async function fetchFirstData() {
    const games = await getAllGamesApi();
    const genres = await getGenresApi();
    const platforms = await getPlatform();
    setAllGames(games)
    setCardGames(games);
    setGenres(genres);
    setPlatforms(platforms);
  }



  async function fetchFilter() {
    const filteredGames = await getFilteredGenrePlatform(filter)
    setCardGames(filteredGames)
  }

  useEffect(() => {
    fetchFirstData();
    AOS.init({duration: 2000});
  },[]);

  return (
    <Container className="main" >
      <SearchBar class="justify-content-center w-75 mx-auto searchBar" updateGames={setGamesBySearch} serverCall={getSearchedGames} reset={resetGames}/>
      <Row>
        <Col lg="3">
          <h4>
            <FontAwesomeIcon icon={faFilter} /> Filters
          </h4>
        </Col>
        <Col>
          <h4>Everything</h4>
        </Col>
{/* 
        <Col>
          <h6>New Releases</h6>
        </Col>

        <Col>
          <h6>Popular</h6>
        </Col> */}
      </Row>
      <hr></hr>
      <Row >
        <Col className="filter" lg="3" >
          <Col className="d-flex flex-column">
            <h5>Genre</h5>
            {genres.map((genre, index) => (
              <div className="mb-3" key={`${genre.Name}div1 ${index}`}>
                <Form.Check type="checkbox" id={`${genre.Name}-checkbox${index}`}>
                <Form.Check.Input
                  name="genres"
                  type="checkbox"
                  isValid
                  key={index}
                  onChange={filterFunc}
                  value={parseInt(genre.id)}
                />
                <Form.Check.Label>{genre.Name}</Form.Check.Label>
              </Form.Check>
              </div>
            ))}
          </Col>
          <hr></hr>
          <Col className="d-flex flex-column">
            <h5>System</h5>
            {platforms.map((platform, index) => (
              <div className="mb-3" key={`${platform.Name}div2 ${index}`}>
                <Form.Check type="checkbox" id={`${platform.Name}-checkbox${index}`}>
                <Form.Check.Input
                  name="platforms"
                  type="checkbox"
                  isValid
                  key={index}
                  onChange={filterFunc}
                  value={parseInt(platform.id)}
                />
                <Form.Check.Label>{platform.Name}</Form.Check.Label>
              </Form.Check>
              </div>
            ))}
          </Col>
        </Col>
        <Col className="games-list" data-aos="fade-up">
          <Row>
            {cardGames.map((game) => (
              <Col lg="4" md="6" sm="1">
                <GCard game={game} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Games;
