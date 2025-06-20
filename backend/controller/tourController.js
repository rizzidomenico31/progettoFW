const Tour = require('../model/tourModel')

module.exports = {
    getAllTours: async (req, res) => {
        const tours = await Tour.find()
        if (!tours) { //tour non trovati -> 204 risposta ok ma senza contenuto
            return res.status(204).json({"message": "Tours non disponibili"})
        }
        res.status(200).json(tours)
    },
    addTour: async (req, res) => {
        try {
            console.log(req.body)
            const tour = {
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
            }
            await Tour.create(tour)
            res.status(201).json({message:"Tour Inserito con Successo"})
        }catch (err){
            console.log(err)
            res.status(400).json({error: "Errore!"})
        }

    }
}