const mongoose = require('mongoose')
const {Types} = require("mongoose");

const tourSchema = new mongoose.Schema({
    _id: Types.ObjectId,
    name: String,
    description: String,
    imageUrl: String,
})

module.exports = mongoose.model("Tour" , tourSchema)