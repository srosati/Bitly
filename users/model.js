import { db } from '../db.js';

const SELECT_USER_FIELDS = 'id, email';

export async function createUser(email, password) {
	const result = await db.query(
		`INSERT INTO users (email, password) VALUES ($1, $2) RETURNING ${SELECT_USER_FIELDS}`,
		[email, password]
	);
	return result.rows[0];
}

export async function getUsers() {
	const result = await db.query(`SELECT ${SELECT_USER_FIELDS} FROM users ORDER BY id ASC`);
	return result.rows;
}

export async function getUser(user_id) {
	const result = await db.query(`SELECT ${SELECT_USER_FIELDS} FROM users WHERE ID = $1`, [user_id]);
	return result.rows[0];
}

// Internal use only
export async function findUserByEmail(email) {
	const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
	return result.rows[0];
}

export async function updateUser(user_id, password) {
	const result = await db.query(`UPDATE users SET password = $1 WHERE id = $2 RETURNING ${SELECT_USER_FIELDS}`, [
		password,
		user_id
	]);
	return result.rows[0];
}

export async function deleteUser(user_id) {
	const result = await db.query(`DELETE FROM users WHERE id = $1 RETURNING ${SELECT_USER_FIELDS}`, [user_id]);
	return result.rows[0];
}
