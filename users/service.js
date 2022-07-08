import { hash } from 'bcrypt';
import { validationResult } from 'express-validator';
import { createUser, getUsers, getUser, updateUser, deleteUser } from './model.js';

export async function listUsersService(_, res) {
	try {
		const users = await getUsers();
		res.json(users);
	} catch (err) {
		res.status(500).json(err);
	}
}

export async function createUserService(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { email, password } = req.body;

	try {
		const hashedPassword = await hash(password, 10);

		const user = await createUser(email, hashedPassword);
		return res.status(201).json(user);
	} catch (err) {
		return res.status(500).send(err);
	}
}

export async function getUserService(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	try {
		const user = await getUser(req.params.id);
		if (user == null) return res.status(404).send('User not found');
		return res.json(user);
	} catch (err) {
		return res.status(500).send(err);
	}
}

export async function updateUserService(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { password } = req.body;

	try {
		const user = await getUser(req.params.id);
		if (user == null) return res.status(404).send('User not found');

		const hashedPassword = await hash(password, 10);
		const updatedUser = await updateUser(user.id, hashedPassword);
		return res.json(updatedUser);
	} catch (err) {
		return res.status(500).send(err);
	}
}

export async function deleteUserService(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	try {
		const deleteResult = await deleteUser(req.params.id);
		if (deleteResult == null) return res.status(404).send('User not found');

		return res.status(204).send();
	} catch (err) {
		console.error(err);
		return res.status(500).send(err);
	}
}
