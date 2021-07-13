import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import SplitButton from "react-bootstrap/SplitButton";
import Form from "react-bootstrap/Form";
import { getSearchedGames } from "../DAL/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function SearchBar(props) {
  const [searchBy, setSearchBy] = useState("g.gameName");
  const [searchParams, setSearchParams] = useState("");

  async function search() {
    if (searchParams) {
      const newGames = await props.serverCall(searchParams, searchBy);
      props.updateGames(newGames);
    }else props.updateGames(await props.reset())
  }

  return (
    <Row className={props.class}>
      <InputGroup className="mb-3">
        <SplitButton
          variant="outline-primary"
          title={searchBy === "g.gameName" ? "Name" : "Year"}
          id="segmented-button-dropdown-1"
        >
          <Dropdown.Item
            href="#/action-1"
            onClick={() => setSearchBy("g.gameName")}
          >
            Name
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-2"
            onClick={() => setSearchBy("releaseDate")}
          >
            Year
          </Dropdown.Item>
          {/* <Dropdown.Item href="#/action-3" onClick={() => setSearchBy("Date")}>
            Realease Date
          </Dropdown.Item> */}
        </SplitButton>
        <FormControl
        placeholder="Search..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          className="mainSearch"
          onBlur={(e) => setSearchParams(e.target.value)}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            className="searchBtn"
            onClick={search}
          >
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </InputGroup.Append>
        {searchBy === "Genre" && (
          <Row className="align-items-end radio-search-row">
            <Form.Check inline label="Any" name="genre" type="radio" />
            <Form.Check inline label="All" name="genre" type="radio" />
          </Row>
        )}
      </InputGroup>

      {/* <ListGroup className="w-75 mx-auto">
        <ListGroup.Item>
          <SearchCard game={cardGames1[0]} />
        </ListGroup.Item>
      </ListGroup> */}
    </Row>
  );
}

export default SearchBar;
