import { db, redisClient } from '../db.js';

const order_by = {
	clicks: 'clicks DESC',
	created_at: 'created_at'
};

export async function listUrls(user_id, order = 'created_at') {
	const result = await db.query(`SELECT * FROM urls WHERE user_id = $1 ORDER BY ${order_by[order]}`, [user_id]);
	return result.rows;
}

export async function listUrlsWithTag(user_id, tag_id, order = 'created_at') {
	const result = await db.query(
		`SELECT * FROM urls JOIN url_tags ut ON urls.id = ut.url_id WHERE user_id = $1 AND tag_id = $2 ORDER BY ${order_by[order]}`,
		[user_id, tag_id]
	);
	return result.rows;
}

export async function getUrlTags(url_id) {
	const result = await db.query(`SELECT * FROM url_tags LEFT JOIN tags on tags.id = url_tags.tag_id WHERE url_tags.url_id = $1`, [url_id]);
	return result.rows;
}

export async function createUrl(user_id, redirect_to, alias, title = alias) {
	const result = await db.query(
		`INSERT INTO urls (user_id, redirect_to, alias, title) VALUES ($1, $2, $3, $4) RETURNING *`,
		[user_id, redirect_to, alias, title]
	);
	return result.rows[0];
}

export async function appendTag(url_id, tag_id) {
	const result = await db.query(`INSERT INTO url_tags (url_id, tag_id) VALUES ($1, $2) RETURNING *`, [
		url_id,
		tag_id
	]);
	return result.rows[0];
}

export async function removeTag(url_id, tag_id) {
	const result = await db.query(`DELETE FROM url_tags WHERE url_id = $1 AND tag_id = $2`, [url_id, tag_id]);
	return result.rows[0];
}

export async function getUrl(id) {
	const result = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
	return result.rows[0];
}

export async function getUrlByAlias(alias) {
	const result = await db.query(`SELECT * FROM urls WHERE alias = $1`, [alias]);
	return result.rows[0];
}

export async function updateUrl(id, redirect_to, alias, title = alias) {
	const result = await db.query(
		`UPDATE urls SET redirect_to = $1, alias = $2, title = $3 WHERE id = $4 RETURNING *`,
		[redirect_to, alias, title, id]
	);
	await setRedisAlias(alias, redirect_to);
	return result.rows[0];
}

export async function incrementUrlClicks(alias) {
	const result = await db.query(`UPDATE urls SET clicks = clicks + 1 WHERE alias = $1 RETURNING *`, [alias]);
	return result.rows[0];
}

export async function deleteUrl(id) {
	const result = await db.query(`DELETE FROM urls WHERE id = $1 RETURNING *`, [id]);
	await removeRedisAlias(result.rows[0].alias);

	return result.rows[0];
}

// REDIS FUNCTIONS
export async function getRedisAlias(alias) {
	const result = await redisClient.get(alias);
	return result;
}

export async function setRedisAlias(alias, url) {
	await redisClient.set(alias, url);
}

export async function removeRedisAlias(alias) {
	await redisClient.del(alias);
}
