import { hash } from 'bcrypt';
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
	const { email, password } = req.body;
	if (!email || !password) return res.status(400).send('Email and password are required');

	try {
		const hashedPassword = await hash(password, 10);

		const user = await createUser(email, hashedPassword);
		return res.status(201).json(user);
	} catch (err) {
		console.error(err);
		return res.status(500).send(err);
	}
}

export async function getUserService(req, res) {
	if (!req.params.id) return res.status(400).send('Id is required');

	try {
		const user = await getUser(req.params.id);
		if (user == null) return res.status(404).send('User not found');
		return res.json(user);
	} catch (err) {
		return res.status(500).send(err);
	}
}

export async function updateUserService(req, res) {
	if (!req.params.id) return res.status(400).send('Id is required');
	if (!req.body.password) return res.status(400).send('Password is required');

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
	if (!req.params.id) return res.status(400).send('Id is required');

	try {
		const deleteResult = await deleteUser(req.params.id);
		if (deleteResult == null) return res.status(404).send('User not found');

		return res.status(204).send();
	} catch (err) {
		console.error(err);
		return res.status(500).send(err);
	}
}
