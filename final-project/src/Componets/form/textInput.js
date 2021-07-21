import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import ErrorMessages from "./ErrorMsg"

import {
  faUser,
  faMailBulk,
  faUnlockAlt,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function TextInput(props) {
    
    
    return (
        <Form.Row className="justify-content-around">
              <Form.Group as={Col} controlId={props.name}>
                <Form.Label>
                  <strong>{props.label}</strong>
                </Form.Label>
                <InputGroup className="text-input">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">
                      <FontAwesomeIcon icon={props.icon} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type={props.type}
                    placeholder={props.label}
                    onChange={props.validateInput}
                    name={props.name}
                    className={props.background}
                    value={props.value}
                  />
                </InputGroup>
                <ErrorMessages errors={props.errors} />
              </Form.Group>
            </Form.Row>
    )
}

export default TextInput;