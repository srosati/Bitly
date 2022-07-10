import { checkSchema } from 'express-validator';

const aliasValidator = {
	in: 'body',
	isString: true,
	isLength: {
		options: { min: 4, max: 20 },
		errorMessage: 'Alias must be between 4 and 20 characters long'
	}
};

const redirectToValidator = {
	in: 'body',
	isURL: true,
	errorMessage: 'Redirect URL must be a valid URL'
};

const nameValidator = {
	in: 'body',
	optional: true,
	isString: true,
	isLength: {
		options: { min: 4, max: 20 },
		errorMessage: 'Name must be between 4 and 20 characters long'
	}
};

const idValidator = {
	in: 'params',
	isInt: true,
	errorMessage: 'ID must be an integer',
	toInt: true
};

const tagIdValidator = {
	in: 'body',
	isInt: true,
	errorMessage: 'Tag ID must be an integer',
	toInt: true
};

const queryTagValidator = {
	in: 'query',
	isOptional: true,
	isInt: true,
	errorMessage: 'Tag ID must be an integer',
	toInt: true
};

const newUrlSchema = {
	alias: aliasValidator,
	redirect_to: redirectToValidator,
	name: nameValidator
};

const updateUrlSchema = {
	alias: aliasValidator,
	name: nameValidator,
	redirect_to: redirectToValidator,
	id: idValidator
};

const urlIdSchema = {
	id: idValidator
};

const tagSchema = {
	id: idValidator,
	tag_id: tagIdValidator
};

const redirectSchema = {
	alias: {
		in: 'params',
		isString: true,
		isLength: {
			options: { min: 4, max: 20 }
		}
	}
};

const queryTagSchema = {
	tag_id: queryTagValidator
};

export const createUrlValidator = checkSchema(newUrlSchema);
export const updateUrlValidator = checkSchema(updateUrlSchema);
export const urlIdValidator = checkSchema(urlIdSchema);
export const tagValidator = checkSchema(tagSchema);
export const queryValidator = checkSchema(queryTagSchema);
export const redirectValidator = checkSchema(redirectSchema);
