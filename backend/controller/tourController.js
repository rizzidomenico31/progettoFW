const Tour = require('../model/tourModel')
module.exports = {
    getAllTours: async (req, res) => {
        const tours = await Tour.find()
        if (!tours) { //tour non trovati -> 204 risposta ok ma senza contenuto
            return res.status(204).json({"message": "Tours non disponibili"})
        }
        res.status(200).json(tours)
    }
}