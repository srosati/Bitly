import { Router } from 'express';
import isLoggedIn from '../auth/filters/isLoggedIn.js';
import isUrlOwner from '../auth/filters/isUrlOwner.js';
import {
	createUrlService,
	deleteUrlService,
	getUrlService,
	listUrlsService,
	updateUrlService
} from './service.js';

import { createUrlValidator, updateUrlValidator, urlIdValidator } from './validation.js';

const urlRouter = Router();

urlRouter.get('/', isLoggedIn, listUrlsService);

urlRouter.get('/:id', isLoggedIn, urlIdValidator, getUrlService);

urlRouter.post('/', isLoggedIn, createUrlValidator, createUrlService);

urlRouter.put('/:id', isUrlOwner, updateUrlValidator, updateUrlService);

urlRouter.delete('/:id', isUrlOwner, urlIdValidator, deleteUrlService);

export default urlRouter;
