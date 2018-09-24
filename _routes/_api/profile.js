const {
	handler
} = require('../../_errors/handler');
const {
	errorTypes
} = require('../../_errors/types');
const jwt = require('jsonwebtoken');
const keys = require('../../_config/keys');

const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');

//Get the User Model
const User = require('../../_models/User');
const Profile = require('../../_models/Profile');

//logging
const {
	logger
} = require('../../_logging/winston');

//Load the Validators 
// const regValidation = require('../../_utils/_validators/registrationValidator');

const passport = require('passport'); //leverage passwords in order to create a protected route

/*
 * @route   GET api/profile/test
 * @desc    Tests the profile route
 * @access  Public
 */
router.get('/test', (req, res) => {
	res.json({
		msg: 'Profile User Route'
	});
});

/*
 * @route   GET api/profile
 * @desc    Gets the current user's profile
 * @access  Private
 * req		The request will contain the token
 */
router.get('/', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	console.debug('Request Data: ' + JSON.stringify(req.user));

	/*
	 * Init Errors 
	 */
	const errors = {};

	Profile.findOne({
			user: req.user.id
		})
		.then(profile => {
			if (!profile) {
				return res.status(404).json({
					profile: 'There is no profile found for the passed user.' //todo: change when proper error codes and exceptions 
				});
			}

			res.json(profile);
		})
		.catch(err => {
			console.err(err);
			res.status(404).json(err);
		})

});

/*
 * @route   POST api/profile
 * @desc    Update or Create a Profile
 * @access  Private
 * req		The request will contain:
 * 			 - the token with the user information
 * 			 - the body of profile information 
 * 
 * 1. Create or Update the profile associated with that user
 */
router.post('/', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	logger.debug('Request Data: ' + JSON.stringify(req.user));

	/*
	 * Init Errors 
	 */
	const errors = {};

	const profile = {
		role: req.body.role,
		handle: req.user.userName,
		repoType: req.body.repoType,
		repo: req.body.repoType,
		social: req.body.social,
		bio: req.body.bio,
		experience: req.body.experience,
		education: req.body.education
	};

	Profile.findOne({
			user: req.user._id
		})
		.then(p => {
			if (!p) {
				//there is no profile setup for this user
				new Profile(profile).save()
					.then(p => {
						return res.json(p);
					})
					.catch(err => {
						logger.error(err);
						return res.status(404).json(err);
					})
			}

			//update the profile, find fuctions onthe model, not the instance of it
			Profile.findOneAndUpdate({
					user: req.user._id
				}, {
					$set: profile
				}, {
					new: true
				})
				.then(p => {
					return res.json(p);
				})
				.catch(err => {
					logger.error(err);
					return res.status(404).json(err);
				});
		})
		.catch(err => {
			logger.error(err);
			return res.status(404).json(err);
		});
});

module.exports = router;