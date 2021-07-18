const express = require("express");
const router = express.Router();
const multer = require("../DAL/multer");
const api = require("../DAL/api");
const auth = require("../DAL/validations");

// gets a username, email, password, passwordcConfirm, img, genres
router.post("/", multer.cpUpload, async (req, res) => {
  const added = await api.addUser(req.body, req.file);
  res.status(200).send(added);
});

//updates user data
router.put("/", auth.authUser, multer.cpUpload, async (req, res) => {
  const { cookies } = req;
  const user = JSON.parse(cookies.user);
  const added = await api.putUser(req.body, req.file, user.userID);
  res.status(200).send(added);
});

module.exports = router;
