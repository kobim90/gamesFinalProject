var express = require("express");
var router = express.Router();
const api = require("../DAL/api");

//gets user username and password and return its data
router.post("/", async (req, res) => {
  try {
    const user = await api.postLogin(req.body.username, req.body.password);
    if(!user){
      res.status(401).json({error: 'username or password incorrect'});
    }else {
      res.cookie("user", JSON.stringify(user));
      res.status(200).json({data: user});
    }
  } catch (err) {
    res.send(false)
  }
});

module.exports = router;
