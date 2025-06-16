const User = require("../model/userModel");
require('dotenv').config()
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require("passport");
const bcrypt = require("bcrypt")
const FRONTEND_URL = process.env.FRONTEND_URL

const trasporter = nodemailer.createTransport({  //inizializzazione del trasporter per inviare le mail
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, //dati presenti in .env
        pass: process.env.GMAIL_PASSWORD,
    }
})
module.exports = {
    createUser: async (req, res) => {
        const tempUser = await User.findOne({email: req.body.email})
        if (tempUser) {  //controllo univocità email
            return res.status(400).send({error: "Email already exist"})
        }
        const user = new User ({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        await User.register(user , req.body.password , (error , user) =>{
            if (user) res.status(201).send({message: "Utente registrato con sucesso!"})
            else res.status(500).send({error: error})
        } ) // .register fa hashing della password e crea il salt salvando tutto sul db
    } ,
    login: async (req, res) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!user) return res.status(400).json({ message: 'Invalid email or password' });
//.autenticate legge in autonomia dalla req.body dando per scontato il fatto che venga chiamata tramite POST
            req.login(user, (err) => {
                if (err) return res.status(500).json({ message: err.message });
                return res.json({ message: 'Login successful', user: { email: user.email, firstName: user.firstName } });
            });
        })(req, res);
    } ,
    isAuth: async (req, res) => { //molto utile per capire se l'utente è loggato oppure no -> Viene usato per visuallizare o meno cose nalla navbar
        if (req.isAuthenticated()){
            res.json({ loggedIn: true , user: req.user });
        }else {
            res.json({loggedIn: false});
        }
    },
    logout: async (req, res) => {
        req.logout(err => {
            if (err) {
                return res.status(500).json({ message: 'Logout failed' });
            }
            res.clearCookie('connect.sid'); //importante ripulire i cookie altirmenti la sessione rimane settata e l'utente è come se fosse loggato
            res.json({ message: 'Logged out successfully' });
            res.status(200)
        });
    },
    sendEmailReset: async (req, res) => { //prima richiesta per il cambio password -> si occupa di settare i token e mandare la mail

        const user = await User.findOne({email: req.body.email}) //controlla che la mail inserira sia asscoaita ad un account
        if (!user) return res.status(400).send({error: "Utente Non Trovato"})

        const token = crypto.randomBytes(20).toString('hex');  //crea un token
        user.resetPasswordToken = token; //lo salva nei campi predisposti nello schema
        user.resetPasswordExpires = Date.now() + 3600000; //durata 1h
        await user.save() //salva

        const resetLink = `${FRONTEND_URL}/change-password/${token}`;  //il link che riceverà l'utente rimanda ad una pagina frontend di react
        const mailOptions = { //settaggio di tutte le info per la mail
            from: process.env.GMAIL_USER,
            to: req.body.email,
            subject: "Reimposta la tua Password",
            text: `Reimposta la tua Password , il link scade tra 1h : ${resetLink}`,
        }
        trasporter.sendMail(mailOptions , (err, info) => { //invio effettivo della mail con callback per verificare lo stato della richiesta
            if (err) {
                res.status(500).send({error: err.message});
            }else res.status(200).send({message: "Mail inviata!"});
        })
        },

    changePassword: async (req, res) => { //seconda richiesta per il cambio password -> si occupa di cambiare effettivamnte la password
        const user = await User.findOne({  //verifica la validà del token - FONDAMENTALE
            resetPasswordToken: req.params.token,
            //resetPasswordExpires > Date.now() -> Token valido
            //resetPasswordExpires < Date.now() -> Token scaduto
            resetPasswordExpires: {$gt: Date.now() }, //gt -> greater than -> maggiore di quindi verifico che in token non sia scaduto
        })
        if (!user) { //se il token non è valido oppure è scaduto return 401
            res.status(401).send({message: "Token Non Valido o Scaduto"});
            return
        }

        user.setPassword(req.body.password , async (err, user) => {
            if (err) return res.status(500).send({message: "Internal Server Error"})
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            //l'annullamento dei token rende utilizzabile il link per il reset una sola volta
        })
        res.status(200).send({message: "Password changed successfully"});
    }
}