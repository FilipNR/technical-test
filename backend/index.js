const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./models');

const airportRouter = require('./routes/Airports');
const countryRouter = require('./routes/Countries');
const airlinesRouter = require('./routes/Airlines');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/airports", airportRouter);
app.use("/countries", countryRouter);
app.use("/airlines", airlinesRouter);

db.sequelize.sync().then(() => {
  app.listen(8000, async () => {
    console.log('Server started on port 8000');
  });
});

