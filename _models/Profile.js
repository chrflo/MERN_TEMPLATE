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
            'developer',
            'general'
        ]
    },
    repoType: {
        type: String,
        enum: [
            'GitHub',
            'BitBucket',
            'GitLab',
            'Other'
        ]
    },
    repo: {
        type: String
    },
    social: {
        linkedin: {
            type: String
        },
        twitter: {
            type: String
        },
        facbook: {
            type: String
        }
    },
    bio: {
        type: String,
    },
    experience: [{
        employer: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        start: {
            type: Date,
            required: true
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }],
    education: [{
        school: {
            type: String,
            required: true
        },
        program: {
            type: String,
            required: true
        },
        start: {
            type: Date,
            required: true
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }]
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);