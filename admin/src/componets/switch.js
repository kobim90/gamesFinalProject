import {Switch, Route, Redirect} from "react-router-dom"
import React from "react"
import AuthiApi from "../DAL/auth"
import ProtectedRoute from "./protected"
import Login from "./login"
import AddGame from "./addGame"
import {useContext} from "react"

function Routing() {
    const Auth = useContext(AuthiApi)
    
    return (
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <ProtectedRoute path="/addGame" auth={Auth.auth} component={AddGame}/>
        </Switch>
    )
}

export default Routing;