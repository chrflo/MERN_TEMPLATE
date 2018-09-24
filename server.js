const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

//logging
const {
	logger
} = require('./_logging/winston');

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
 * NOTE: currently mongoose still leverages ensureIndex, 
 *       this should be updated by them in the future
 */
const database = require('./_config/keys').mongoURI;
mongoose
	.connect(database, {
		useNewUrlParser: true
	})
	.then(() => {
		console.log('Connected to Mongo Database');
	})
	.catch(err => {
		console.log(err);
	});

/*
 * Setup Passport
 * 1.init
 * 2. config
 */
app.use(passport.initialize());
require('./_config/passport.js')(passport);

/*
 * Set up the routes
 */
app.use('/api/users', users);
app.use('/api/profile', profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`MERN TEMPLATE SERVER: running on port ${port}`));