const multer = require("multer")

const fileStorageEngin = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/users')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    }
})

const upload = multer({storage: fileStorageEngin})

const cpUpload = upload.single('img')

module.exports = {cpUpload};