var express = require('express');
var router = express.Router();
const api = require("../DAL/api")


/* GET arr of all games. */
router.get('/', async function(req, res, next) {
  const games = await api.getGames()
  res.send(games);
});

router.get("/search", async (req, res) => {
  const searchParam = req.query.searchParam
  const searchBy = req.query.searchBy
  const games = await api.getGameSearch(searchParam, searchBy)
  res.send(games)
})

// get all games filtered by platform/genre
router.get("/filteredGames", async (req, res) => {
  const filteredBy = req.query
  const games = await api.getFilteredGames(filteredBy)
  res.send(games)
})

// get 7 games sorted by score/release date
router.get("/sortedGamesScoreDate", async (req, res) => {
  const sortedBy = req.query.sort
  const direction = req.query.direction
  const games = await api.getGamesSorted(sortedBy, direction)
  res.send(games)
})

// get all game Reviews, recieves gameID
router.get("/reviews/:gameId", async (req, res) => {
  const gameId = req.params
  const reviews = await api.getGameReviews(gameId.gameId)
  res.send(reviews)
})

// get all game details (includes details and description) by gameId
router.get("/:gameId", async (req, res) => {
  const gameID = req.params
  const game = await api.getAllGameDetails(gameID.gameId)
  res.send(game)
})

// get games screenshots, by id[i]
router.get("/screenshots", async (req, res) => {
  const gameIds = req.query
  const screenshots = await api.getGameScreenshots(gameIds)
  res.send(screenshots)
})



module.exports = router;
