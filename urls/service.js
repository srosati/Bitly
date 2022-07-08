import { getUrl, listUrls, createUrl, updateUrl, deleteUrl, getUrlByAlias, incrementUrlClicks } from './model.js';
import { validationResult } from 'express-validator';
import { getUser } from '../users/model.js';

export async function listUrlsService(_, res) {
	try {
		const aliases = await listUrls();
		res.json(aliases);
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

	let url = await getUrlById(req.params.id);
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
		let url = await getUrlByAlias(req.params.alias);
		if (url == null)
			return res.status(404).json({
				error: 'Url not found'
			});
		
        await incrementUrlClicks(url.id);
		res.redirect(url.redirect_to);
	} catch (err) {
		res.status(500).json(err);
	}
}
