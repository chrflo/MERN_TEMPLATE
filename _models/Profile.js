/*
 * Create a Schema for the Profile
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfileSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    role: {
        type: String,
        required: true,
        enum: [
            'admin',
            'athlete',
            'coach',
            'staff'
        ]
    },
    bio: [{
        about: {
            type: String
        },
        region: {
            type: String
        },
        age: {
            type: Number
        },
        height: {
            type: Number
        },
        weight: {
            type: Number
        },
        affiliate: {
            type: String
        }
    }],
    benchmarkStats: [{
        backSquat: {
            type: Number
        },
        cleanAndJerk: {
            type: Number
        },
        snatch: {
            type: Number
        },
        deadlift: {
            type: Number
        },
        maxPullups: {
            type: Number
        },
        fightGoneBad: {
            type: Number
        },
        fran: {
            type: Number
        },
        grace: {
            type: Number
        },
        helen: {
            type: Number
        },
        filthyFifty: {
            type: Number
        },
        fourHundoSprint: {
            type: Number
        },
        fiveKRun: {
            type: Number
        }
    }]
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);