import { Switch, Route, Redirect } from "react-router-dom";
import UserHome from "./userHome";
import EditProfile from "./editProfile"
import UserGames from "./userGames"

function UserSwitch() {
  return (
    <Switch>
        <Route
                exact
                path="/user"
                render={() => {
                    return (
                      <Redirect to="/user/userGames" /> 
                    )
                }}
              />
      <Route exact path="/user/editProfile">
        <EditProfile />
      </Route>
      <Route exact path="/user/addReview">
        <EditProfile />
      </Route>
      <Route exact path="/user/userGames">
        <UserGames />
      </Route>
    </Switch>
  );
}

export default UserSwitch;
