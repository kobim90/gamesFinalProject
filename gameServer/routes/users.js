var express = require("express");
var router = express.Router();
const api = require("../DAL/api");
const auth = require("../DAL/validations");

/* GET users data from userId. */
router.get("/", async function (req, res, next) {
  const userID = req.query.userId;
  const user = api.getUser(userID);
  res.send(user);
});

// get users edit profile data
router.get("/profile", auth.authUser, async (req, res) => {
  try {
    const { cookies } = req;
    const user = JSON.parse(cookies.user);
    const data = await api.getUserProfileData(user.userID);
    res.send(data);
  } catch {
    res.status(401).json({ error: "server problem" });
  }
});

//get users games by userId
router.get("/games", auth.authUser, async (req, res) => {
  const { cookies } = req;
  const user = JSON.parse(cookies.user);
  const usersGames = await api.getUsersGames(user.userID);
  res.send(usersGames);
});

//get users favorite Games ids
router.get("/favorite", auth.authUser, async (req, res) => {
  const { cookies } = req;
  const user = JSON.parse(cookies.user);
  const usersGames = await api.getUserGameList(user.userID);
  res.send(usersGames);
});

router.get("/scores", auth.authUser, async (req, res) => {
  try {
    const { cookies } = req;
    const user = JSON.parse(cookies.user);
    const scores = await api.getUsersScores(user.userID);
    res.send(scores);
  } catch {
    res.status(401).json({ error: "server problem" });
  }
});

router.get("/username", async (req, res) => {
  try {
    const username = req.query.username;
    console.log(username);
    const scores = await api.getUserByUsername(username);
    res.send(scores);
  } catch {
    res.status(401).json({ error: "user server problem" });
  }
});

//get users reviews by userId and gameId
router.get("/games", async (req, res) => {
  const userID = req.query.userId;
  const gameID = req.query.gameId;
  const usersReviews = api.getUsersReviews(userID, gameID);
  res.send(usersReviews);
});

// get users top reviewed games by userId
router.get("/topReviewd", async (req, res) => {
  const userID = req.query.userId;
  const games = api.getTopUserGames(userID);
  res.send(games);
});

// search by name/date/genre from users games and only on genre or some by userId
router.get("/search", auth.authUser, async (req, res) => {
  const searchParam = req.query.searchParam;
  const searchBy = req.query.searchBy;
  const { cookies } = req;
  const user = JSON.parse(cookies.user);
  const games = await api.getGameSearch(searchParam, searchBy, user.userID);
  res.send(games);
});

// add game to users favorite by gameId and userId
router.post("/addGame/:gameId", auth.authUser, async (req, res) => {
  const { cookies } = req;
  const userId = JSON.parse(cookies.user);
  const ans = await api.postUserGame(userId.userID, req.params.gameId);
  res.send(ans);
});

// delete game from users favorite by gameId and userId
router.delete("/addGame/:gameId", auth.authUser, async (req, res) => {
  const { cookies } = req;
  const userId = JSON.parse(cookies.user);
  const ans = await api.deleteGameFavorite(userId.userID, req.params.gameId);
  res.send(ans);
});

// add review to a game, gets: gameId, title, tag[i], body, conclusion, score, userId
router.post("/addReview",auth.authUser, async (req, res) => {
  const { cookies } = req;
  const userId = JSON.parse(cookies.user);
  const ans = await api.postReview(userId.userID, req.body.data);
  res.send(ans);
});

router.get("/gamesToReview", auth.authUser, async (req, res) => {
  const { cookies } = req;
  const user = JSON.parse(cookies.user);
  const games = await api.getGamesToReview(user.userID);
  res.send(games);
});

router.get("/review/:reviewId", auth.authUser, async (req, res) => {
  const reviewId = req.params.reviewId 
  const review = await api.getReview(reviewId);
  res.send(review);
});

// update review
router.put("/review/:reviewId", auth.authUser, async (req, res) => {
  const reviewId = req.params.reviewId 
  const review = await api.putReview(reviewId, req.body.data);
  res.send(review);
});


// edit users details, geting the userId and email |/& password |/& img |/& genreid[i]
router.put("/editUser", async (req, res) => {
  const userID = req.query.userId;
  const details = req.query;
  delete details.userId;
  api.updateUser(userID, details);
});

module.exports = router;
