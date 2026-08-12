import { Request, Response } from 'express';
import { createUserService } from './user.service';
import { getUserService } from './user.service';
import { updateUserService } from './user.service';
import { deleteUserService } from './user.service';

export const createUserController = async (req: Request, res: Response) => {
	const data = req.body;

	if (!data || Object.keys(data).length === 0) {
		return res.status(400).json({ error: 'Ошибка создания пользователя' });
	}

	try {
		const createUser = await createUserService(data);
		res.status(201).json(createUser);
	} catch {
		res.status(500).json({ error: 'Ошибка запроса!' });
	}
};

export const getUserController = async (req: Request, res: Response) => {
	const { id } = req.params;
	const userId = Number(id);
	if (!id || isNaN(userId)) {
		return res.status(400).json({ error: 'В запросе отсутствует ID' });
	}
	try {
		const getUser = await getUserService({ id: userId });
		if (!getUser) {
			return res.status(404).json({ error: 'Пользователь с таким ID не найден' });
		}
		return res.status(200).json(getUser);
	} catch (error) {
		return res.status(500).json({ error: 'Внешняя ошибка сервера' });
	}
};

export const updateUserController = async (req: Request, res: Response) => {
	const { id } = req.params;
	const userId = Number(id);
	const data = req.body;

	if (!id || isNaN(userId)) {
		return res.status(400).json({ error: 'У пользователя отсутствует ID, либо ID устарел' });
	}

	if (!data || Object.keys(data).length === 0) {
		return res.status(400).json({ error: 'Запрос пуст, обновление недоступно' });
	}

	try {
		const updateUser = await updateUserService(userId, data);
		res.status(200).json(updateUser);
	} catch {
		res.status(500).json({ error: 'Внешняя ошибка сервера при изменении параметров' });
	}
};

export const deleteUserController = async (req: Request, res: Response) => {
	const { id } = req.params;
	const userId = Number(id);

	if (!id || isNaN(userId)) {
		return res.status(400).json({ error: 'Ошибка удаления! Пользователь не найден' });
	}
	try {
		const deleteUser = await deleteUserService(userId);
		res.status(200).json(deleteUser);
	} catch {
		res.status(500).json({ error: 'Внешняя ошибка сервера' });
	}
};
