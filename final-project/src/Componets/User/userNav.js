import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import "./userNavStyle.css";
// import AuthApi from "../../DAL/AuthApi";
import React from "react";
// import Cookies from "js-cookie";

function UserNav(params) {
  // const Auth = React.useContext(AuthApi);

  return (
    <Nav justify variant="tabs" defaultActiveKey="/userGames" className="inside-nav">
      <Nav.Item>
        <NavLink activeClassName="userActive" to="/user/userGames">
          GAMES
        </NavLink>
      </Nav.Item>
      {/* {Cookies.getJSON("user").admin ? ( */}
        {/* <Nav.Item>
          <NavLink activeClassName="userActive" to="/user/addGame">
            ADD GAME
          </NavLink>
        </Nav.Item> */}
      {/* // ) : ( */}
        <Nav.Item>
          <NavLink activeClassName="userActive" to="/user/addReview">
            ADD REVIEW
          </NavLink>
        </Nav.Item>
      {/* // )} */}

      <Nav.Item>
        <NavLink activeClassName="userActive" to="/user/editProfile">
          PROFILE
        </NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default UserNav;
