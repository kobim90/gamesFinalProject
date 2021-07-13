var express = require('express');
var router = express.Router();

/* GET arr of games. */
router.get('/', function(req, res, next) {
  res.send([
    {
      gameID: 1,
      gameName: "Cyberpunk 2077",
      publisher: "CD PROJEKT RED",
      releaseDate: "2020-12-10",
      description: "sadasda",
      coverImg: "./Images/1.jpg",
    },
    {
      gameID: 2,
      gameName: "Witcher 3",
      publisher: "CD PROJEKT RED",
      releaseDate: "2020-12-10",
      description: "sadasda",
      coverImg: "./Images/2.jpg",
    },
    {
      gameID: 3,
      gameName: "Metro Exodus",
      publisher: "CD PROJEKT RED",
      releaseDate: "2020-12-10",
      description: "sadasda",
      coverImg: "./Images/3.jpg",
    },
    {
      gameID: 4,
      gameName: 'Hollow Knight',
      publisher: "CD PROJEKT RED",
      releaseDate: "2020-12-10",
      description: "sadasda",
      coverImg: "./Images/4.jpg",
    },
    {
      gameID: 5,
      gameName: "Baldur's Gate 3",
      publisher: "CD PROJEKT RED",
      releaseDate: "2020-12-10",
      description: "sadasda",
      coverImg: "./Images/5.jpg",
    },
    {
      gameID: 6,
      gameName: 'Sleeping Dogs',
      publisher: "CD PROJEKT RED",
      releaseDate: "2020-12-10",
      description: "sadasda",
      coverImg: "./Images/6.jpg",
    },
    {
      gameID: 7,
      gameName: 'METAL GEAR SOLID',
      publisher: "CD PROJEKT RED",
      releaseDate: "2020-12-10",
      description: "sadasda",
      coverImg: "./Images/7.jpg",
    },
    {
      gameID: 8,
      gameName: 'Carmageddon',
      publisher: "CD PROJEKT RED",
      releaseDate: "2020-12-10",
      description: "sadasda",
      coverImg: "./Images/8.jpg",
    },
    {
      gameID: 9,
      gameName: 'Heroes 3',
      publisher: "CD PROJEKT RED",
      releaseDate: "2020-12-10",
      description: "sadasda",
      coverImg: "./Images/9.jpg",
    },
  ]);
});

module.exports = router;
