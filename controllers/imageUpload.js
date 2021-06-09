import multer from 'multer'

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './client/public/uploads/')
  },

  filename: function(req, file, cb) {
    cb(null, file.originalname + Date.now())
  }
})

const upload = multer({storage: storage})

export {upload}
