import { Switch, Route, Redirect } from "react-router-dom";
import EditProfile from "./editProfile"
import UserGames from "./userGames"
import AddReview from "./addReview"
import GamePage from "../gamePage";
import AddGame from "./addGame";



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
        <AddReview />
      </Route>
      <Route exact path="/user/addGame">
        <AddGame />
      </Route>
      <Route exact path="/user/userGames">
        <UserGames />
      </Route>
      <Route exact path="/game/:gameId">
                <GamePage />
      </Route>
      <Route exact path="/user/editReview/:reviewId">
        <AddReview />
      </Route>
    </Switch>
  );
}

export default UserSwitch;
