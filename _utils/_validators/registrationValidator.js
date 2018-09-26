const validator = require('validator');
const isEmpty = require('../isObjectEmpty');

/*
 * Validate the the user data follows the rules that we have defined
 * 1. Name must be between 2 and 30 characters
 * 2. User Name must be between 5 - 10 characters 
 *      (duplicate emails is handled by mongoose schema)
 * 3. The email address is valid 
 *      (can and will be also handled in the react component for email, but let's add this for sanity)
 * 4. The password must match a certain set of strength criteria including: length, special characters, and cases 
 *      (can and will also be handled in the reach field)
 * 5. The second password provided must match the first (will validate in the react component as well)
 */
module.exports = function validateRegistration(userData) {
    let errors = {};

    /* Explaination of Regex
        ^ asserts position at start of a line
            Positive Lookahead (?=.*\d)
            Assert that the Regex below matches
                .* matches any character (except for line terminators)
                * Quantifier — Matches between zero and unlimited times, as many times as possible, giving back as needed (greedy)
            \d matches a digit (equal to [0-9])
        
            Positive Lookahead (?=.*[a-z])
            Assert that the Regex below matches
                .* matches any character (except for line terminators)
                * Quantifier — Matches between zero and unlimited times, as many times as possible, giving back as needed (greedy)
                Match a single character present in the list below [a-z]
                a-z a single character in the range between a (index 97) and z (index 122) (case sensitive)
        
            Positive Lookahead (?=.*[A-Z])
            Assert that the Regex below matches
                .* matches any character (except for line terminators)
                * Quantifier — Matches between zero and unlimited times, as many times as possible, giving back as needed (greedy)
                Match a single character present in the list below [A-Z]
                A-Z a single character in the range between A (index 65) and Z (index 90) (case sensitive)
        
            Positive Lookahead (?=.*\W)
            Assert that the Regex below matches
                .* matches any character (except for line terminators)
                * Quantifier — Matches between zero and unlimited times, as many times as possible, giving back as needed (greedy)
                \W matches any non-word character (equal to [^a-zA-Z0-9_])
        
        .{6,12} matches any character (except for line terminators)
            {6,12} Quantifier — Matches between 6 and 12 times, as many times as possible, giving back as needed (greedy)
        
        $ asserts position at the end of a line
        
        Global pattern flags
            g modifier: global. All matches (don't return after first match)
            m modifier: multi line. Causes ^ and $ to match the begin/end of each line (not only begin/end of string)
     */
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,12}$/gm;

    const nameValid = !isEmpty(userData.name) && validator.isLength(userData.name, {
        min: 2,
        max: 30
    });
    const userNameValid = !isEmpty(userData.userName) && validator.isLength(userData.userName, {
        min: 5,
        max: 10
    });
    const emailValid = !isEmpty(userData.email) && validator.isEmail(userData.email);
    const passwordValid = !isEmpty(userData.password) && (regex.exec(userData.password) !== null);

    /*
     * Set the individual if statements to check and set the errors
     */
    if (!nameValid) {
        //TODO: make a function for this
        errors = {
            property: "name",
            message: 'Name must be a length that is between 2 and 30 characters'
        };
    }
    if (!userNameValid) {
        errors = {
            property: "userName",
            message: 'Username must be a length that is between 5 and 10 characters.'
        };
    }
    if (!emailValid) {
        errors = {
            property: "email",
            message: 'The email address provided is not valid.'
        };
    }
    if (!passwordValid) {
        errors = {
            property: "password",
            message: 'The password provided does not meet the outline stength criteria.'
        };
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}