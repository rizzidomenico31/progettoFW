const express = require('express')
const router = express.Router()
const tourController = require('../controller/tourController')
const {models} = require("mongoose");
const authMiddleware = require("../middleware/authMiddleware")

router.get("/alltours", tourController.getAllTours)

//in ordine controlla se l'utente è: loggato , autorizzato e poi esegue la callback del controller.
router.post("/addtour" , authMiddleware.isLoggedIn , authMiddleware.isAdminUser , tourController.addTour )

module.exports = router
