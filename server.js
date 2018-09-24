const express = require('express');
const mongoose = require('mongoose');

/*
 * Bring in the API routes
 */
const template1 = require('./_routes/_api/template1');
const template2 = require('./_routes/_api/template2');

const app = express();

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
app.use('/api/template1', template1);
app.use('/api/template1', template2);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`MERN TEMPLATE SERVER: running on port ${port}`));