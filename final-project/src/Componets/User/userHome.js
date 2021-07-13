import Container from "react-bootstrap/esm/Container";
import { BrowserRouter as Router } from "react-router-dom";
import UserNav from "./userNav"
import UserSwitch from "./userSwitch"
import UserGames from "./userGames"


function UserHome() {
    return (
        <Router>
            <Container className="main">
            <UserNav />
            <UserSwitch />
            </Container>
        </Router>
    )
}

export default UserHome;