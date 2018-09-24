const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


/*
 * Bring in the API routes
 */
const users = require('./_routes/_api/users');
const profile = require('./_routes/_api/profile');

const app = express();

/*
 * Body Parser Middleware
 */
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/*
 * Mongo Database Config and Connection
 */
const database = require('./config/keys').mongoURI;
mongoose
    .connect(database)
    .then(() => {
        console.log('Connected to Mongo Database');
    })
    .catch(err => {
        console.log(err);
    });

app.get('/', (req, res) => res.send('Hello World'));

/*
 * Set up the routes
 */
app.use('/api/users', users);
app.use('/api/profile', profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`MERN TEMPLATE SERVER: running on port ${port}`));