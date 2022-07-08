import userMatches from './userMatches.js';

export default async function isTagOwner(req, res, next) {
	const tag_id = req.params.id;

	if (tag_id == null) return res.status(400).send('Tag id is required');

	const tag = await findTagById(tag_id);
	if (tag == null) return res.status(404).send('Tag not found');

	req.user_id = tag.user_id;
	userMatches(req, res, next);
}
