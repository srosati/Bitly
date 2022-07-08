import { db } from '../db.js';

export async function listUrls(user_id) {
    const result = await db.query(`SELECT * FROM urls WHERE user_id = $1`, [user_id]);
    return result.rows;
}

export async function createUrl(user_id, redirect_to, alias, title = alias) {
    const result = await db.query(`INSERT INTO urls (user_id, redirect_to, alias, title) VALUES ($1, $2, $3, $4) RETURNING *`, [user_id, redirect_to, alias, title]);
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
    const result = await db.query(`UPDATE urls SET redirect_to = $1, alias = $2, title = $3 WHERE id = $4 RETURNING *`, [redirect_to, alias, title, id]);
    return result.rows[0];
}

export async function incrementUrlClicks(id) {
    const result = await db.query(`UPDATE urls SET clicks = clicks + 1 WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
}

export async function deleteUrl(id) {
    const result = await db.query(`DELETE FROM urls WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
}