import { Request, Response } from 'express';
import { createChatService } from './chats.service';
import { getChatService } from './chats.service';
import { updateChatService } from './chats.service';
import { deleteChatService } from './chats.service';

export const createChatController = async (req: Request, res: Response) => {
	const data = req.body;

	if (!data || Object.keys(data).length === 0) {
		return res.status(400).json({ error: 'Запрос пуст, нельзя создать пустой запрос!' });
	}

	try {
		const createChat = await createChatService(data);
		res.status(201).json(createChat);
	} catch {
		res.status(500).json({ error: 'Ошибка запроса!' });
	}
};

export const getChatController = async (req: Request, res: Response) => {
	const { userId } = req.query;
	const users = Number(userId);
	if (!userId || isNaN(users)) {
		return res.status(400).json({ error: 'Вы забыли передать userId или передали не число' });
	}
	try {
		const getChat = await getChatService(users);

		return res.status(200).json(getChat);
	} catch {}
};

export const updateChatController = async (req: Request, res: Response) => {
	const { chatId } = req.params;
	const numericChatId = Number(chatId);
	const data = req.body;

	if (!chatId || isNaN(numericChatId)) {
		return res.status(400).json({ error: 'ID чата устарел или отсутствует' });
	}

	if (!data || Object.keys(data).length === 0) {
		return res.status(400).json({ error: 'Запрос пуст, обновление недоступно' });
	}
	try {
		const updateChat = await updateChatService(numericChatId, data);
		res.status(200).json(updateChat);
	} catch {
		res.status(500).json({ error: 'Внешняя ошибка сервера при обновлении чата' });
	}
};

export const deleteChatController = async (req: Request, res: Response) => {
	const { chatId, userId } = req.params;
	const numericChatId = Number(chatId);
	const numericUserId = Number(userId);

	if (!chatId || isNaN(numericChatId)) {
		return res.status(400).json({ error: 'Ошибка удаления! Не найдет чат' });
	}

	if (!userId || isNaN(numericUserId)) {
		return res.status(400).json({ error: 'Ошибка! Пользователь не найден' });
	}

	try {
		const deleteChat = await deleteChatService(numericUserId, numericChatId);
		res.status(200).json(deleteChat);
	} catch {
		res.status(500).json({ error: 'Ошибка сети, удаление не возможно' });
	}
};
