const express = require('express');
const router = express.Router()
const userController = require('../controller/userController')
const verifyToken = require('../middleware/verifyToken')



router.put("/:id",verifyToken,userController.updateUser)
router.delete("/:id",verifyToken,userController.deleteUser)
router.get("/find/:id",userController.getUser)
router.get("/",verifyToken,userController.getAllUser)
router.get("/stats",userController.userStats)



module.exports = router





