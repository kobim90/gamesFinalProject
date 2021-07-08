import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image"

function Avatar(props) {
  return (
    <Container>
      <Row>
        <Col xs={2} md={2} lg={4}>
          <Row><Image src={props.details.img} roundedCircle fluid/></Row>
          <Row><h6>{props.details.username}</h6></Row>
          <Row>Games: {props.details.games}</Row>
          <Row>Reviews: {props.details.reviews}</Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Avatar;