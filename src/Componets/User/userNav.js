import Nav from "react-bootstrap/Nav"
import { NavLink } from "react-router-dom";
import "./userNavStyle.css"

function UserNav(params) {
  return (
    <Nav justify variant="tabs" defaultActiveKey="/userGames">
      <Nav.Item>
        <NavLink activeClassName="userActive" to="/user/userGames">My Games</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink activeClassName="userActive" to="/user/addReview">Add Review</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink activeClassName="userActive" to="/user/editProfile">My Profile</NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default UserNav;