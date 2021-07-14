const express = require("express")
const router = express.Router()
const api = require("../DAL/api")


router.get("/", async (req, res) =>  {
    //validations...
    const genre = await api.getGenre()
    res.send(genre)
})

router.get("/platforms", async (req, res) => {
    const platforms = await api.getPlatforms()
    res.send(platforms)
})

router.get("/tags", async (req, res) => {
    const platforms = await api.getReviewTags()
    res.send(platforms)
})

module.exports = router;