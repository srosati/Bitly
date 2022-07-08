import { checkSchema } from 'express-validator';

const newUserSchema = {
	email: {
		in: 'body',
		isEmail: true,
		errorMessage: 'Email is required'
	},
	password: {
		in: 'body',
		isString: true,
		errorMessage: 'Password is required',
		isLength: {
			options: { min: 8, max: 16 },
			errorMessage: 'Password must be bewteen 8 and 16 characters long'
		}
	}
};

export const createUserValidator = checkSchema(newUserSchema);
