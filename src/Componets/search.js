import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function SearchBar(){
    return (
        <Row className="justify-content-center">
          <InputGroup className="mb-3 w-75">
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Name</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Gener</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Date</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <FormControl
              placeholder="Search By Name..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              className="mainSearch"
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" className="searchBtn">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
    )
}

export default SearchBar;