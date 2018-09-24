const {
    handler
} = require('../../_errors/handler');
const {
    errorTypes
} = require('../../_errors/types');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
var validator = require('email-validator');

const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

//Get the User Model
const User = require('../../_models/User');

/*
 * @route   GET api/users/test
 * @desc    Tests the users route
 * @access  Public
 */
router.get("/test", (req, res) => {
    res.json({
        msg: "Users Route Test"
    });
});

/*
 * @route   POST api/users/register
 * @desc    Registers the user
 * @access  Public
 */
router.post("/register", (req, res) => {
    /*
     * Create the new user based on the reqest data
     * Generate a salt of the password and set that password as the hash
     * Attempt to save
     */
    const newUser = new User({
        name: req.body.name,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    });

    // generate the salt so that we can encrypt the new user
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw err;
            }

            //make sure to set the plain test password to the hash
            newUser.password = hash;
            newUser.save()
                .then(user => {
                    res.json(user);
                })
                .catch((err) => {
                    //let's add some logic to see what the error is (i.e.: duplicate user name, duplicate email, etc)
                    // console.log(err);
                    res.status(400).json(handler(errorTypes.MONGOOSE_ERROR, err));
                })
        });
    });
});

/*
 * @route   POST api/users/login
 * @desc    Logs the user in either by email or userName (will take a form object called loginID)
 * @access  Public
 */
router.post("/login", (req, res) => {
    const loginID = req.body.loginID;
    const password = req.body.password;
    const field = (validator.validate(loginID)) ? 'email' : 'userName';
    User.findOne({
            [field]: loginID
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    [field]: 'The user or password is incorrect.'
                })
            }

            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (isMatch) {
                        //The user is found, let's create the token
                        const payload = {
                            id: user.id,
                            name: user.name,
                            userName: user.Name,
                            email: user.email
                        }

                        /*
                         * In order to create the web token we need the following:
                         * 1. Payload (user data)
                         * 2. the secret 
                         * 3. the expiry (in seconds)
                         * 4. what happens when it is successful
                         */
                        jwt.sign(payload, keys.secret, {
                                expiresIn: 3600
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            }); //TODO: make this expires in reset every time the user is active on the page
                    } else {
                        return res.status(400).json({
                            message: 'The user or password is incorrect.'
                        });
                    }
                })
                .catch((err) => {
                    return res.status(400).json(handler(errorTypes.API_ERROR, err));
                })
        })
        .catch((err) => {
            return res.status(400).json(handler(errorTypes.API_ERROR, err));
        })
});

module.exports = router;