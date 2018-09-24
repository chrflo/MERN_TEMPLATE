const {
    Strategy,
    ExtractJwt
} = require('passport-jwt');

const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../_config/keys');
const {
    errorTypes
} = require('../_errors/types');
const {
    mongoosCodes
} = require('../_errors/codes');
const {
    handler
} = require('../_errors/handler');
const {
    logger
} = require('../_logging/winston');


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secret
}

module.exports = (passport) => {
    passport.use(
        new Strategy(opts, (jwtPayload, done) => {
            logger.debug('Get the JWT Payload: ' + JSON.stringify(jwtPayload));
            /*
             * Find the user by id using the jwtPayload
             */
            User.findById(jwtPayload.id)
                .then(user => {
                    const u = { ...user._doc,
                        rtype: 'user'
                    };
                    logger.debug('Finding user by ID: ' + JSON.stringify(user));

                    if (u) {
                        return done(null, u);
                    }

                    return done(null, false);
                })
                .catch(err => {
                    console.error(err);
                    return done(null, { ...handler(errorTypes.MONGOOSE_ERROR, err),
                        rtype: 'error'
                    }); // will need to check in the protected route if this is an error
                });
        })
    );
};