const {
    errorTypes
} = require('./types');
const errorCodes = require('./codes');

exports.handler = function (type, err) {
    switch (type) {
        case errorTypes.MONGOOSE_ERROR:
            const code = err.code;
            const msg = err.errmsg;

            //Duplicate index
            if (code === 11000) {
                //check to see if it contain email or userName
                if (msg.includes("email")) {
                    return errorCodes.mongoosCodes.dup.email;
                } else if (msg.includes("userName")) {
                    return errorCodes.mongoosCodes.dup.userName;
                }
            }

            return errorCodes.mongoosCodes.ukwn.originalError = err;
        default:
            return errorCodes.unknownErrors.ukwn;
    }
}