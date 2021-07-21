import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import SearchBar from "../search";
import { getUsersGamesApi, getUsersSearchedGames } from "../../DAL/api";
import GCard from "../card";
import GameChart from "./chart";
import Cookies from "js-cookie";
import AOS from 'aos';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faChartLine,
  faArrowUp,
  faStar,
  faFileSignature,
} from "@fortawesome/free-solid-svg-icons";

import 'aos/dist/aos.css'

function UserGames() {
  const [usersGames, setUsersGames] = useState([]);
  const [allUserGames, setAllUserGames] = useState([]);

  function setGamesBySearch(games) {
    setUsersGames(games);
  }

  const resetGames = () => setUsersGames(allUserGames);

  useEffect(() => {
    (async function getData() {
      const games = await getUsersGamesApi();
      setUsersGames(games);
      setAllUserGames(games);
      // AOS.init({duration: 3000});
    })();
  }, []);
  return (
    <Container>
      <Row className="align-items-center">
        <SearchBar
          class="justify-content-center w-75 mx-auto searchBar"
          updateGames={setGamesBySearch}
          serverCall={getUsersSearchedGames}
          reset={resetGames}
        />
      </Row>
      <Row className="w-75 mx-auto">
        {usersGames.map((game, index) => (
          <Col lg="4" md="6" sm="1" >
            <GCard game={game} />
          </Col>
        ))}
      </Row>


      <h5 className="mt-3">
          <FontAwesomeIcon icon={faFileSignature} /> Your Top Reviews
        </h5>
          <hr></hr>
      <Row>
        <Col lg="11">
          <GameChart />
        </Col>
      </Row>
    </Container>
  );
}

export default UserGames;
