const express = require('express');
const session = require('express-session');
const LocalStrategy = require('passport-local')
const passport = require('passport');
const cors = require('cors');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT
const mongoose = require('mongoose');
const db = mongoose.connection
const userRouter = require('./router/userRoute');
const User = require('./model/userModel');
const tourRouter = require('./router/tourRoute');

//connessione al DB mongo su Atlas
mongoose.connect(process.env.MONGO_URI)

app.use(cors({
    origin: process.env.FRONTEND_URL, // URL frontend
    credentials: true //essenziale per usare sessione con cookie
}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true } // secure: true solo in HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({usernameField: 'email'}, User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware per l'utilizzo dei router
app.use('/auth' , userRouter);
app.use('/tours', tourRouter);

//metto l'app in ascolto sulla porta solo se mi connetto al DB correttamente
db.once('open', () => {
    console.log('Database Connected');
    app.listen(PORT , () =>{
        console.log("Server running on port: " + PORT)
    })
})

