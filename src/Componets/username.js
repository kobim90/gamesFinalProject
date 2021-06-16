import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import ErrorMessages from "./ErrorMsg";

import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Username(props) {
    return (
        <Form.Group as={Col} controlId="Username">
                <Form.Label>
                  <strong>Username</strong>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    onChange={props.validateInput}
                    onBlur={props.validateInput}
                    name="username"
                    className="username"
                  />
                </InputGroup>
              </Form.Group>
    )
}

export default Username;