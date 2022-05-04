const countriesData = require('./countries.json')
const { Countries } = require('./models')

// console.log(countries);
const createCountries = countriesData.forEach(country => {
    const { name, code } = country; // Destructure each country
    Countries.build({ name, code })
})

module.exports = createCountries;