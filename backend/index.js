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
const {Server} = require("socket.io");
const http = require("http");
const axios = require("axios");

//connessione al DB mongo su Atlas
mongoose.connect(process.env.MONGO_URI)



app.use(cors({
    origin: process.env.FRONTEND_URL, // URL frontend
    credentials: true //essenziale per usare sessione con cookie
}));

app.use(express.json());

app.set('trust proxy', 1);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        sameSite: 'none',
    } // secure: true solo in HTTPS
}));

const server = http.createServer(app);
const io = new Server(server , {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true,
    }
});
//prendo la temperatura da api di terze parti
const getTemperatura = async (req, res) => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Bari&appid=21ad77df0ce5f9e1d5904b7daad1c0da&units=metric');
        return response.data.main.temp;
    } catch (error) {
        console.error("Non Riesco ad Ottenere la temperatura", error);
        return 'Buona'; // o un valore di fallback
    }
}

//socket.io
io.on('connection', (socket) => {
    console.log(`Client connected!`); //riesce a trovare il client
    const notificationInterval = setInterval(async () => { //ogni 20 secondi aggiorna la temperatura e la manda al cliente con .emit
        const temperatura = await getTemperatura();
        const message = `Benvenuto! La temperetura nei pressi di Polignano e Monopoli è: ${temperatura}Gradi, alle ore ${new Date().toLocaleTimeString()}`;
        socket.emit('notification', {message: message});
    }  , 20000)

    socket.on('disconnect', () => {
        console.log(`Client disconnected!`);
    })
})

//middleware passport
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
    server.listen(PORT , () =>{
        console.log("Server running on port: " + PORT)
    })
})

