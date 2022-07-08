import { checkSchema } from 'express-validator';

const passwordValidator = {
	in: 'body',
	isString: true,
	errorMessage: 'Password is required',
	isLength: {
		options: { min: 8, max: 16 },
		errorMessage: 'Password must be bewteen 8 and 16 characters long'
	}
};

const newUserSchema = {
	email: {
		in: 'body',
		isEmail: true,
		errorMessage: 'Email is required'
	},
	password: passwordValidator
};

const updateUserSchema = {
	password: passwordValidator
};

const userIdSchema = {
	id: {
		in: 'params',
		isInt: true,
		toInt: true,
		errorMessage: 'User Id is required'
	}
};

export const createUserValidator = checkSchema(newUserSchema);
export const updateUserValidator = checkSchema(updateUserSchema);
export const userIdValidator = checkSchema(userIdSchema);
