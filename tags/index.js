import { Router } from 'express';
import { createTagService, listTagsService, getTagService, updateTagService, deleteTagService } from './service.js';
import isLoggedIn from '../auth/filters/isLoggedIn.js';
import isTagOwner from '../auth/filters/isTagOwner.js';

const tagsRouter = Router();

tagsRouter.get('/', isLoggedIn, listTagsService);

tagsRouter.get('/:id', isTagOwner, getTagService);

tagsRouter.post('/', isLoggedIn, createTagService);

tagsRouter.put('/:id', isTagOwner, updateTagService);

tagsRouter.delete('/:id', isTagOwner, deleteTagService);

export default tagsRouter;
