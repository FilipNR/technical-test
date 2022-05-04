const express = require('express');
const router = express.Router();

const db = require('../models');
const Countries = db.Countries;

router.get("/", async (req, res) => {
    const listOfCountries = await Countries.findAll();
    res.json(listOfCountries);
});

module.exports = router;