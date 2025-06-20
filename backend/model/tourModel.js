const mongoose = require('mongoose')
const {Types} = require("mongoose");

const tourSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
})

module.exports = mongoose.model("Tour" , tourSchema)