import {Switch, Route, Redirect} from "react-router-dom"
import Home from "./Home"
import Games from "./games"
import Register from "../Componets/form/Register"
import UserHome from "./User/userHome"
import GamePage from "./gamePage"

function Pages() {
    return (
        <Switch>
              <Route
                exact
                path="/"
                render={() => {
                    return (
                      <Redirect to="/home" /> 
                    )
                }}
              />
            <Route exact path="/home">
                <Home />
            </Route>
            <Route exact path="/allGames">
                <Games />
            </Route>
            <Route exact path="/Register">
                <Register />
            </Route>
            <Route exact path="/user">
                <UserHome />
            </Route>
            <Route exact path="/game/:gameId">
                <GamePage />
            </Route>
        </Switch>
    )
}

export default Pages;