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
}

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
}

const urlIdSchema = {
    id: idValidator
}

export const createUrlValidator = checkSchema(newUrlSchema);
export const updateUrlValidator = checkSchema(updateUrlSchema);
export const urlIdValidator = checkSchema(urlIdSchema);