/*eslint no-case-declarations: "error"*/
/*eslint-env es6*/

exports.mongoosCodes = {
	'dup': {
		'email': {
			code: 1001,
			type: 'Duplicate not allowed',
			message: 'The email address entered already exists.',
			property: 'email'
		},
		'userName': {
			code: 1001,
			type: 'Duplicate not allowed',
			message: 'The username entered already exists.',
			property: 'userName'
		}
	},
	'ukwn': {
		code: 1666,
		type: 'Unknown Mongoose Error',
		message: 'An unknown error occurred with mongoose.',
		property: 'unknown'
	}
};

exports.unknownErrors = {
	'ukwn': {
		code: 6000,
		type: 'Unknown',
		message: 'An unknown error occurred',
		property: 'unknown'
	}
};

exports.apiErrors = {
	'ukwn': {
		code: 2666,
		type: 'Unknown API Error',
		message: 'An unknown API error occurred.',
		property: 'unknown'
	}
}