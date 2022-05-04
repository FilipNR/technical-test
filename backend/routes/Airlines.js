const express = require('express');
const router = express.Router();

const db = require('../models');
const Airlines = db.Airlines;

router.get("/", async (req, res) => {
    const listOfAirlines = await Airlines.findAll(); // List airlines and send them
    res.json(listOfAirlines);
});

router.post("/", async (req, res) => {
    const post = req.body
    const { name, country } = post;
    res.redirect('http://localhost:3000/airlines')
    await Airlines.create({ name, country }); // Create new airline from post request

});

router.put("/:id", async (req, res) => {
    const post = req.body
    const { name, country } = post;
    const id = req.params.id;

    await Airlines.update({ name, country }, {
        where: {
            id: id
        }
    }); // Update airport
    console.log(post, id)
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    await Airlines.destroy({ where: { id: id } });
});

module.exports = router;