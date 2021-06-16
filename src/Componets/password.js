import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";


import {
    faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Password(props) {
    return (
        <Form.Group as={Col} controlId="password">
                <Form.Label>
                  <strong>Password</strong>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">
                      <FontAwesomeIcon icon={faUnlockAlt} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    onChange={props.validateInput}
                    onBlur={props.validateInput}
                    name="password"
                    className="password"
                  />
                </InputGroup>
              </Form.Group>
    )
}

export default Password;