import { db } from '../db.js';

export async function createTag(name, user_id) {
	const result = await db.query('INSERT INTO tags (name, user_id) VALUES ($1, $2) RETURNING *', [name, user_id]);
	return result.rows[0];
}

export async function listTags(user_id) {
	const result = await db.query('SELECT * FROM tags WHERE user_id = $1', [user_id]);
		return result.rows;
}

export async function getTagById(id) {
	const result = await db.query('SELECT * FROM tags WHERE id = $1', [id]);
	return result.rows[0];
}

export async function getTagByName(name, user_id) {
	const result = await db.query('SELECT * FROM tags WHERE name = $1 and user_id = $2', [name, user_id]);
	return result.rows[0];
}

export async function updateTag(id, name) {
	const result = await db.query('UPDATE tags SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
	return result.rows[0];
}

export async function deleteTag(id) {
	const result = await db.query('DELETE FROM tags WHERE id = $1 RETURNING *', [id]);
	return result.rows[0];
}
