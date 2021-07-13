const express = require("express")
const router = express.Router()
const api = require("../DAL/api")


router.get("/", async (req, res) =>  {
    //validations...
    const genre = await api.getGenre()
    res.send(genre)
})

router.get("/platforms", async (req, res) => {
    const platforms = api.getPlatforms()
    res.send(platforms)
})

module.exports = router;