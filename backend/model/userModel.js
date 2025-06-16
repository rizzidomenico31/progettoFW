const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: String,  //email univoca
    firstName:String,
    lastName:String,
    resetPasswordToken: String,  //token per il resetPassword
    resetPasswordExpires: Date   //scadenza token resetPassword
})

userSchema.plugin(passportLocalMongoose , {
    usernameField: 'email',
})

module.exports = mongoose.model("Users" , userSchema); //esportazione del modello