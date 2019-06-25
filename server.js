const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app()
app = express();

// Secret key for the database
db = require('./config/Keys').URI;

// Connecting to the Database
mongoose
  .connect(db, {
    useNewUrlParser: true,
    // sets how many times to try reconnecting
    reconnectTries: Number.MAX_VALUE,
    // sets the delay between every retry (milliseconds)
    reconnectInterval: 1000
  })
  .then(() => console.log('Mlab is connected'))
  .catch(err => console.log(err));

// Cors set up for cross Domain requests
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true // enable set cookie
  })
);

app.use(bodyParser.json()); ///////////////////////
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000 || process.env.PORT; //HEROKU

app.listen(port, () => console.log(`Server running on port ${port}`));
