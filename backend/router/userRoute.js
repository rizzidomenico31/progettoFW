const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.use(express.json());

router.post("/adduser" , userController.createUser )

router.post("/login" , userController.login)

router.get("/user" , userController.isAuth)  //non agisce sul db

router.get('/logout' , userController.logout)  //non agisce sul db

router.post('/reset-password' , userController.sendEmailReset)

router.post('/reset-password/:token' , userController.changePassword)


module.exports = router;
