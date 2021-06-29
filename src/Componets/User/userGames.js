import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import SearchBar from "../search";
import { getUsersGamesApi } from "../../DAL/api";
import GCard from "../card";
import GameChart from "./chart";


function UserGames() {
  const [usersGames, setUsersGames] = useState([]);

  useEffect(() => {
    (async function getData() {
      const games = await getUsersGamesApi("kobi");
      setUsersGames(games);
    })();
  }, []);

  return (
    <Container>
      <Row className="align-items-center">
        <Col>
          <SearchBar class="w-75 mx-auto" />
        </Col>
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
        </Col>
      </Row>
      <Row className="w-75 mx-auto">
        {usersGames.map((game) => (
          <Col lg="4" md="6" sm="1">
            <GCard game={game} />
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center chart-row">
        <h1>Your Top reviewed Games</h1>
        <div className="chart-div">
         <GameChart />
        </div>
      </Row>
    </Container>
  );
}

export default UserGames;
