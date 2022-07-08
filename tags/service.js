import { createTag, listTags, updateTag, getTagById, getTagByName, deleteTag } from './model.js';
import { getUser } from '../users/model.js';

export async function listTagsService(_, res) {
	try {
		const tags = await listTags({});
		return res.json(tags);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
}

export async function createTagService(req, res) {
	const { name } = req.body;
	const { id } = req.user;
	if (!name || !id) {
		return res.status(400).json({
			error: 'name is required'
		});
	}

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
	const { id } = req.params.id;
	if (!id) {
		return res.status(400).json({
			error: 'Id is required'
		});
	}
	try {
		const tag = await getTagById(id);
		return res.json(tag);
	} catch (err) {
		return res.status(500).json({
			error: err.message
		});
	}
}

export async function updateTagService(req, res) {
	const { id } = req.params.id;
	const { name } = req.body;
	if (!id) {
		return res.status(400).json({
			error: 'Id is required'
		});
	}
	const tag = await getTagById(id);
	if (tag == null) {
		return res.status(204).json({
			error: 'Tag not found'
		});
	}
	try {
		const tag = await updateTag(id, name);
		return res.json(tag);
	} catch (err) {
		return res.status(500).json({
			error: err.message
		});
	}
}

export async function deleteTagService(req, res) {
	const { id } = req.params.id;
	if (!id) {
		return res.status(400).json({
			error: 'Id is required'
		});
	}
	const tag = await getTagById(id);
	if (tag == null) {
		return res.status(204).json({
			error: 'Tag not found'
		});
	}
	try {
		const tag = await deleteTag(id);
		return res.json(tag);
	} catch (err) {
		return res.status(500).json({
			error: err.message
		});
	}
}
