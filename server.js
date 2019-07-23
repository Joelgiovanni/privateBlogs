const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
var path = require('path');
require('dotenv').config();

// Initialize app()
app = express();

// Secret key for the database
db = require('./config/Keys').URI;

var router = require('./routing/routes');

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

// Add the react production build to serve react requests

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./passport/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cors set up for cross Domain requests
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true // enable set cookie
  })
);

// Routes / Router
app.use('/auth', router);

/*Adds the react production build to serve react requests*/
app.use(express.static(path.join(__dirname, 'client/build')));

const port = process.env.PORT || 5000;

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + 'client/build/index.html'));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
