/*eslint no-case-declarations: "error"*/
/*eslint-env es6*/

exports.mongoosCodes = {
	'dup': {
		'email': {
			code: 1001,
			type: 'Duplicate not allowed',
			message: 'The email address entered already exists.'
		},
		'userName': {
			code: 1001,
			type: 'Duplicate not allowed',
			message: 'The username entered already exists.'
		}
	},
	'ukwn': {
		code: 1666,
		type: 'Unknown Mongoose Error',
		message: 'An unknown error occurred with mongoose.'
	}
};

exports.unknownErrors = {
	'ukwn': {
		code: 6000,
		type: 'Unknown',
		message: 'An unknown error occurred'
	}
};