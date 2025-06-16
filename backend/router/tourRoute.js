const express = require('express')
const router = express.Router()
const tourController = require('../controller/tourController')
const {models} = require("mongoose");

router.get("/alltours", tourController.getAllTours)

module.exports = router
