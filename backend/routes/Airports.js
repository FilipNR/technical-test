const express = require('express');
const router = express.Router();

const db = require('../models');
const Airport = db.Airports;

router.get("/", async (req, res) => {
    const listOfAirports = await Airport.findAll();
    res.json(listOfAirports);
});

router.post("/", async (req, res) => {
    const post = req.body;
    const { airport_name, country, latitude, longitude, airlines } = post;
    console.log(req.body)
    res.redirect('https://filipnr.github.io/technical-test/')

    await Airport.create({
        name: airport_name,
        country: country,
        latitude: latitude,
        longitude: longitude,
        airlines: airlines
    });
});

router.put("/:id", async (req, res) => {
    const post = req.body
    const { name, country } = post;
    const id = req.params.id;

    await Airport.update({ name, country }, {
        where: {
            id: id
        }
    }); // Update airport
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    await Airport.destroy({ where: { id: id } }); // Delete airport
});

module.exports = router;
