import { createTag, listTags, updateTag, getTagById, getTagByName, deleteTag } from './model.js';
import { getUser } from '../users/model.js';
import { validationResult } from 'express-validator';

export async function listTagsService(_, res) {
	try {
		const tags = await listTags({});
		return res.json(tags);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
}

export async function createTagService(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { name } = req.body;
	const { id } = req.user;
	const user = await getUser(id);
	
	if (user == null) {
		return res.status(404).json({
			error: 'user not found'
		});
	}
	const tag = await getTagByName(name, user.id);
	if (tag != null) {
		return res.status(409).json({
			error: 'tag already exists'
		});
	}
	try {
		const tag = await createTag(name, user.id);
		return res.status(201).json(tag);
	} catch (err) {
		return res.status(500).json({
			error: err.message
		});
	}
}

export async function getTagService(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	try {
		const tag = await getTagById(req.params.id);
		return res.json(tag);
	} catch (err) {
		return res.status(500).json({
			error: err.message
		});
	}
}

export async function updateTagService(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { name } = req.body;
	const tag = await getTagById(req.params.id);
	if (tag == null) {
		return res.status(204).json({
			error: 'Tag not found'
		});
	}
	try {
		const tag = await updateTag(req.params.id, name);
		return res.json(tag);
	} catch (err) {
		return res.status(500).json({
			error: err.message
		});
	}
}

export async function deleteTagService(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const tag = await getTagById(req.params.id);
	if (tag == null) {
		return res.status(204).json({
			error: 'Tag not found'
		});
	}
	try {
		const tag = await deleteTag(req.params.id);
		return res.json(tag);
	} catch (err) {
		return res.status(500).json({
			error: err.message
		});
	}
}
