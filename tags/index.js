import { Router } from 'express';
import { createTagService, listTagsService, getTagService, updateTagService, deleteTagService } from './service.js';
import isLoggedIn from '../auth/filters/isLoggedIn.js';
import isTagOwner from '../auth/filters/isTagOwner.js';
import { getTagValidator, createTagValidator, updateTagValidator, deleteTagValidator } from './validation.js';

const tagsRouter = Router();

tagsRouter.get('/', isLoggedIn, listTagsService);

tagsRouter.get('/:id', getTagValidator, isTagOwner, getTagService);

tagsRouter.post('/', createTagValidator, isLoggedIn, createTagService);

tagsRouter.put('/:id', updateTagValidator, isTagOwner, updateTagService);

tagsRouter.delete('/:id', deleteTagValidator, isTagOwner, deleteTagService);

export default tagsRouter;
