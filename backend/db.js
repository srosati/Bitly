import pg from 'pg';
import { createClient } from 'redis';

export const db = new pg.Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME
});

const client = createClient({
	url: process.env.REDIS_URL
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

export const redisClient = client;
