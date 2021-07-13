import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import SearchBar from "./search";
import GCard from "./card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import "./gamesStyle.css";
import { getAllGamesApi, getGenresApi, getPlatformApi, getFilteredGenrePlatform, getSearchedGames } from "../DAL/api";

function Games(props) {
  const [cardGames, setCardGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [filter, setFilter] = useState({genres: {}, platforms: {}})

  function setGamesBySearch(games) {
    setCardGames(games)
  }


  function filterFunc({ target: { value, checked, name } }) {
      const newGenres = { ...filter };
      if (checked) newGenres[name][value] = true;
      else delete newGenres[name][value];
      setFilter(newGenres)
      fetchFilter(filter)
  }

  async function fetchFirstData() {
    const games = await getAllGamesApi();
    const genres = await getGenresApi();
    const platforms = await getPlatformApi();
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
  },[]);

  return (
    <Container className="main">
      <SearchBar class="justify-content-center w-75 mx-auto searchBar" updateGames={setGamesBySearch} serverCall={getSearchedGames} reset={getAllGamesApi}/>
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
            <h5>Genre</h5>
            {genres.map((genre, index) => (
              <div className="mb-3" key={`div1 ${index}`}>
                <Form.Check
                  type="checkbox"
                  id="default-checkbox"
                  label={genre.genreName}
                  value={genre.genreID}
                  name="genres"
                  onChange={filterFunc}
                  key={index}
                />
              </div>
            ))}
          </Col>
          <hr></hr>
          <Col className="d-flex flex-column">
            <h5>System</h5>
            {platforms.map((platform, index) => (
              <div className="mb-3" key={`div2 ${index}`}>
                <Form.Check
                  name="platforms"
                  type="checkbox"
                  id="default-checkbox"
                  label={platform.platformName}
                  value={platform.platformID}
                  onChange={filterFunc}
                  key={index}
                />
              </div>
            ))}
          </Col>
        </Col>
        <Col className="games-list">
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
