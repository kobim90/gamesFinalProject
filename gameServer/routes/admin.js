var express = require("express");
var router = express.Router();
const api = require("../DAL/api");
const auth = require("../DAL/validations")
const multer = require("../DAL/multer");

router.post("/", auth.authAdmin, multer.mpUpload, async (req, res) => {
    const ans = await api.postGame(req.body, req.files)
    res.send(ans)
})

router.get("/checkboxData", auth.authAdmin, multer.cpUpload, async (req, res) => {
    try{
        const checkbox = await api.getAdminCheckbox()
        res.send(checkbox)
    }catch{
        res.status(401).json({ error: "server problem" });
    }
    
})

module.exports = router;