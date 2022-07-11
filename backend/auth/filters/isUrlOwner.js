import userMatches from './userMatches.js';
import { getUrl } from '../../urls/model.js';

export default async function isUrlOwner(req, res, next) {
	const url_id = req.params.id;

	if (url_id == null) return res.status(400).send('Tag id is required');

	const url = await getUrl(url_id);
	if (url == null) return res.status(404).send('Url not found');

	req.user_id = url.user_id;
	userMatches(req, res, next);
}
