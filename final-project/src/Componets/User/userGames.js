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

function UserGames() {
  const [usersGames, setUsersGames] = useState([]);
  const [allUserGames, setAllUserGames] = useState([])

  function setGamesBySearch(games) {
    setUsersGames(games)
  }

  const resetGames = () => setUsersGames(allUserGames)

  useEffect(() => {
    (async function getData() {
      const games = await getUsersGamesApi();
      setUsersGames(games);
      setAllUserGames(games)
    })();
  }, []);
  return (
    <Container>
      <Row className="align-items-center">
        {/* <Col> */}
          <SearchBar class="justify-content-center w-75 mx-auto searchBar" updateGames={setGamesBySearch} serverCall={getUsersSearchedGames} reset={resetGames}/>
        {/* </Col>
        <Col>
          <Form.Check
            inline
            label="All Games"
            name="group1"
            type="radio"
            id={`inline-radio-2`}
          />
          <Form.Check
            inline
            label="My Games"
            name="group1"
            type="radio"
            id={`inline-radio-2`}
          />
        </Col> */}
      </Row>
      <Row className="w-75 mx-auto">
        {usersGames.map((game, index) => (
          <Col lg="4" md="6" sm="1">
            <GCard game={game} />
          </Col>
        ))}
      </Row>

      <Row className="justify-content-center chart-header">
        <h1 className="h1-register">Your Top reviewed Games</h1>
      </Row>
      <Row>
        <Col lg="11">
        <GameChart />
        </Col>
        
      </Row>
    </Container>
  );
}

export default UserGames;
