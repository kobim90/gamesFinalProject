const multer = require("multer")

const fileStorageEngin = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/users')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    }
})

const fileStorageEngin2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/newGames')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    }
})

const upload = multer({storage: fileStorageEngin})
const upload2 = multer({storage: fileStorageEngin2})

const cpUpload = upload.single('img')
const mpUpload = upload2.array("images", 6)

module.exports = {cpUpload, mpUpload};