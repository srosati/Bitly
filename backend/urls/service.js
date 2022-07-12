import {
	getUrl,
	listUrls,
	listUrlsWithTag,
	createUrl,
	updateUrl,
	deleteUrl,
	getUrlByAlias,
	getUrlTags,
	incrementUrlClicks,
	getRedisAlias,
	setRedisAlias,
	appendTag,
	removeTag
} from './model.js';
import { validationResult } from 'express-validator';
import { getUser } from '../users/model.js';
import { getTagById } from '../tags/model.js';

export async function listUrlsService(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	try {
		let tag_id = req.query.tag_id;
		let order_by = req.query.order_by;
		if (!tag_id) {
			const aliases = await listUrls(req.user.id, order_by);
			return res.json(aliases);
		}
		const aliases = await listUrlsWithTag(req.user.id, tag_id, order_by);
		return res.json(aliases);
	} catch (err) {
		res.status(500).json(err);
	}
}

export async function createUrlService(req, res) {
	//TODO: Refactor esta en el servicio de tags
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { id } = req.user;
	const user = await getUser(id);

	if (user == null) {
		return res.status(404).json({
			error: 'user not found'
		});
	}
	//
	const url = await getUrlByAlias(req.body.alias);
	if (url != null) return res.status(409).json({ error: 'url already exists' });

	try {
		let redirect_to = req.body.redirect_to;
		if (!redirect_to.startsWith('http')) redirect_to = 'https://' + redirect_to;

		const url = await createUrl(req.user.id, redirect_to, req.body.alias, req.body.name);
		res.json(url);
	} catch (err) {
		res.status(500).json(err);
	}
}

export async function appendTagService(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	let url = await getUrl(req.params.id);
	if (url == null) {
		return res.status(404).json({ error: 'url not found' });
	}
	let tag = await getTagById(req.body.tag_id);
	if (tag == null) {
		return res.status(404).json({ error: 'Tag not found' });
	}
	try {
		await appendTag(url.id, tag.id);
		res.json(url);
	} catch (err) {
		res.status(500).json({ error: err });
	}
}

export async function removeTagService(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	let url = await getUrl(req.params.id);
	if (url == null) {
		return res.status(404).json({ error: 'Url not found' });
	}
	let tag = await getTagById(req.body.tag_id);
	if (tag == null) {
		return res.status(404).json({ error: 'Tag not found' });
	}
	try {
		await removeTag(url.id, tag.id);
		res.json(url);
	} catch (err) {
		res.status(500).json({ error: err });
	}
}

export async function listUrlTagsService(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	let url = await getUrl(req.params.id);
	if (url == null) {
		return res.status(404).json({ error: 'Url not found' });
	}
	try {
		const tags = await getUrlTags(url.id);
		res.json(tags);
	} catch (err) {
		res.status(500).json({ error: err });
	}
}

export async function getUrlService(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	try {
		const url = await getUrl(req.params.id);
		if (url == null) {
			return res.status(404).json({
				error: 'url not found'
			});
		}
		return res.json(url);
	} catch (err) {
		res.status(500).json(err);
	}
}

export async function updateUrlService(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	let url = await getUrl(req.params.id);
	if (url == null) {
		return res.status(404).json({
			error: 'url not found'
		});
	}
	try {
		let redirect_to = req.body.redirect_to;
		if (!redirect_to.startsWith('http')) redirect_to = 'https://' + redirect_to;

		url = await updateUrl(req.params.id, redirect_to, req.body.alias, req.body.name);
		return res.json(url);
	} catch (err) {
		res.status(500).json(err);
	}
}

export async function deleteUrlService(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	let url = await getUrl(req.params.id);
	if (url == null) {
		return res.status(204).json({
			error: 'Url not found'
		});
	}
	try {
		url = deleteUrl(req.params.id);
		return res.json(url);
	} catch (err) {
		res.status(500).json({
			error: err.message
		});
	}
}

export async function redirectUrlService(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	try {
		let redirect_to = await getRedisAlias(req.params.alias);
		if (redirect_to == null) {
			let url = await getUrlByAlias(req.params.alias);
			if (url == null)
				return res.status(404).json({
					error: 'Url not found'
				});

			await setRedisAlias(req.params.alias, url.redirect_to);
			redirect_to = url.redirect_to;
		}

		res.redirect(redirect_to);

		await incrementUrlClicks(req.params.alias);
	} catch (err) {
		res.status(500).json(err);
	}
}
