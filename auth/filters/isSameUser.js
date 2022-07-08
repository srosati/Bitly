import userMatches from './userMatches.js';

export default async function isSameUser(req, res, next) {
	req.user_id = parseInt(req.params.id);
	userMatches(req, res, next);
}
