import { Router } from 'express';
import isLoggedIn from '../auth/filters/isLoggedIn.js';
import isUrlOwner from '../auth/filters/isUrlOwner.js';
import {
	createUrlService,
	deleteUrlService,
	getUrlService,
	listUrlsService,
	updateUrlService,
	appendTagService,
	removeTagService
} from './service.js';

import { createUrlValidator, updateUrlValidator, urlIdValidator, tagValidator, queryValidator } from './validation.js';

const urlRouter = Router();

urlRouter.get('/', isLoggedIn, queryValidator, listUrlsService);

urlRouter.get('/:id', isLoggedIn, urlIdValidator, getUrlService);

urlRouter.post('/', isLoggedIn, createUrlValidator, createUrlService);

urlRouter.post('/:id/tag', isUrlOwner, tagValidator, appendTagService);

urlRouter.put('/:id', isUrlOwner, updateUrlValidator, updateUrlService);

urlRouter.delete('/:id', isUrlOwner, urlIdValidator, deleteUrlService);

urlRouter.delete('/:id/tag', isUrlOwner, tagValidator, removeTagService);

export default urlRouter;
