import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/esm/Row";
import { postLogin } from "../DAL/api";
import { Redirect } from "react-router-dom";
import { useState, useContext } from "react";
import AuthApi from "../DAL/auth";
import React from "react";
import Cookies from "js-cookie";

function Login() {
  const Auth = useContext(AuthApi);
  const [redirect, setRedirect] = useState("")
  const [msg, setMsg] = useState("")

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const onSubmit = async (e) => {
    try{
      e.preventDefault();
      if (data.username && data.password) {
        await postLogin(data.username, data.password);

        if (Cookies.getJSON("user")) {
          if (Cookies.getJSON("user").admin) {
            Auth.setAuth(true);
            setRedirect(<Redirect to="/addGame" />)
          }
        }
      }
    }
    catch(e) {
      setMsg(e.message)
    }
    
  };

  return (
    <>
      <h1>Welcome Admin:</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </Form.Group>
          <Form.Group><Form.Text>{msg}</Form.Text></Form.Group>
          <Form.Group><Form.Text>Return to site <a href="http://localhost:3000">here!</a></Form.Text></Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {redirect}
    </>
  );
}

export default Login;
