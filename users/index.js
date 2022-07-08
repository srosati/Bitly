import { Router } from 'express';
import isLoggedIn from '../auth/filters/isLoggedIn.js';
import isSameUser from '../auth/filters/isSameUser.js';
import {
	createUserService,
	deleteUserService,
	getUserService,
	listUsersService,
	updateUserService
} from './service.js';

import { createUserValidator, updateUserValidator, userIdValidator } from './validation.js';

const usersRouter = Router();

usersRouter.get('/', isLoggedIn, listUsersService);

usersRouter.get('/:id', userIdValidator, isSameUser, getUserService);

usersRouter.post('/', createUserValidator, createUserService);

usersRouter.put('/:id', updateUserValidator, isSameUser, updateUserService);

usersRouter.delete('/:id', userIdValidator, isSameUser, deleteUserService);

export default usersRouter;
