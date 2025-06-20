
module.exports = {
    isLoggedIn: (req, res, next) => { //controlla se l'utente è loggato
        if (req.isAuthenticated()) return next();
        return res.status(401).json({message: "Utente non Loggato!"})
    } ,
    isAdminUser: (req, res, next) => { //controlla se l'utente è Admin e quindi autorizzato
        if (req.user.role === "admin")  return next();
        return res.status(403).json({message: "Risorsa Riservata agli Admin!"})
    }
}