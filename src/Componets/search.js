import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import SplitButton from "react-bootstrap/SplitButton";
import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function SearchBar(props) {
  const [searchBy, setSearchBy] = useState("Name");

  function search(params) {}

  return (
    <Row className={props.class}>
      <InputGroup className="mb-3">
        <SplitButton
          variant="outline-info"
          title={searchBy}
          id="segmented-button-dropdown-1"
          className="searchParam"
        >
          {/* <Dropdown>
          <Dropdown.Toggle
            variant="info"
            id="dropdown-basic"
          ></Dropdown.Toggle>

          <Dropdown.Menu> */}
          <Dropdown.Item href="#/action-1" onClick={() => setSearchBy("Name")}>
            Name
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2" onClick={() => setSearchBy("Genre")}>
            Genre
          </Dropdown.Item>
          <Dropdown.Item href="#/action-3" onClick={() => setSearchBy("Date")}>
            Realease Date
          </Dropdown.Item>
          {/* </Dropdown.Menu>
        </Dropdown> */}
        </SplitButton>
        <FormControl
          placeholder={`Search By ${searchBy}...`}
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          className="mainSearch"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" className="searchBtn">
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
