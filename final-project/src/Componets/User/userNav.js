import Nav from "react-bootstrap/Nav"
import { NavLink } from "react-router-dom";
import "./userNavStyle.css"

function UserNav(params) {
  return (
    <Nav justify variant="tabs" defaultActiveKey="/userGames">
      <Nav.Item>
        <NavLink activeClassName="userActive" to="/user/userGames">GAMES</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink activeClassName="userActive" to="/user/addReview">ADD REVIEW</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink activeClassName="userActive" to="/user/editProfile">PROFILE</NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default UserNav;