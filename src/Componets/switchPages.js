import {Switch, Route, Redirect} from "react-router-dom"
import Home from "./Home"
import Games from "./games"
import Register from "./Register"

function Pages() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/allGames">
                <Games />
            </Route>
            <Route exact path="/Register">
                <Register />
            </Route>
        </Switch>
    )
}

export default Pages;