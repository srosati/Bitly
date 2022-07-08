import { checkSchema } from 'express-validator';

const tagIdValidator = {
	in: 'params',
	isInt: true,
	toInt: true,
	errorMessage: 'Tag ID is required'
};

const tagNameValidator = {
	in: 'body',
	isString: true,
	errorMessage: 'Tag name is required',
	isLength: {
		options: { min: 3, max: 20 },
		errorMessage: 'Tag name must have bewteen 3 and 20 characters long'
	}
};

const getTagSchema = {
	id: tagIdValidator
};

const createTagSchema = {
	name: tagNameValidator
};

const updateTagSchema = {
	id: tagIdValidator,
	name: tagNameValidator
};

const deleteTagSchema = {
	id: tagIdValidator
};

export const getTagValidator = checkSchema(getTagSchema);
export const createTagValidator = checkSchema(createTagSchema);
export const updateTagValidator = checkSchema(updateTagSchema);
export const deleteTagValidator = checkSchema(deleteTagSchema);
