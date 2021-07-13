const express = require("express")
const router = express.Router()
const validation = require("../DAL/validations")
const multer = require("../DAL/multer")
const api = require("../DAL/api")

// gets a username, email, password, passwordcConfirm, img, genres
router.post("/", multer.cpUpload ,async (req, res) => {
    // console.log(req.file);
const validationObj = validation.validationObj
const allErros = [];
// for (const key in user) {
//     let errors = validation.validationChecks(key, user[key], validationObj)
//     if (errors.length) {
//         allErros.push(errors)
//     }
// }
const added = await api.addUser(req.body, req.file)
res.status(200).send(added)
})

module.exports = router;