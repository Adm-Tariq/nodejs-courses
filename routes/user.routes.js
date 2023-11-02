const express = require("express");
const router = express.Router();
const multer  = require('multer')
const diskStorage = multer.diskStorage({
      destination : (req,file, cb)=>{
            cb(null, 'uploads')
      },
      filename: (req, file, cb)=>{
            const ext = file.mimetype.split('/')[1]
            const fileName = `User-+ ${Date.now()}.${ext}`
            cb(null, fileName)
      }

})

const fileFilter = (req,file,cb)=>{
      const imageType = file.mimetype.split('/')[0]
      if(imageType === 'image'){
            cb(null,true)
      }else{
            cb(appError.create('file must be image', 400),false)
      }
}
const upload = multer({ storage: diskStorage, fileFilter })
const userController = require('../controller/users.controller')
const verifyToken = require('../middleware/verifyToken');
const appError = require("../utils/appError");
// get all user

// register

// login

router.route("/")
      .get(verifyToken, userController.getAllUser)

router.route("/register")
      .post(upload.single('avatar'),userController.register)

router.route("/login")
      .post(userController.login)


module.exports = router;
