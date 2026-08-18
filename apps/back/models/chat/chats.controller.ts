import { Request, Response } from 'express';
import { createChatService } from './chats.service';
import { getChatService } from './chats.service';
import { updateChatService } from './chats.service';
import { deleteChatService } from './chats.service';
import { deleteChatsService } from './chats.service';
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
	const { userId } = req.params;
	const numericUserId = Number(userId);
	if (!userId || isNaN(numericUserId)) {
		return res.status(400).json({ error: 'Вы забыли передать userId или передали не число' });
	}
	try {
		const getChat = await getChatService({
			users: {
				some: {
					id: numericUserId,
				},
			},
		});

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
		const updateChat = await updateChatService(
			{
				id: numericChatId,
			},
			data,
		);
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
		const deleteChat = await deleteChatService({
			id: numericChatId,
			users: {
				some: {
					id: numericUserId,
				},
			},
		});
		res.status(200).json(deleteChat);
	} catch {
		res.status(500).json({ error: 'Ошибка сети, удаление не возможно' });
	}
};
export const deleteChatsManyController = async (req: Request, res: Response) => {
	try {
		const { chatIds, userId } = req.params;

		if (!chatIds || !Array.isArray(chatIds) || chatIds.length === 0) {
			return res.status(400).json({ error: 'Не переданы ID чатов для удаления' });
		}

		const numericUserId = Number(userId);
		if (!userId || isNaN(numericUserId)) {
			return res.status(400).json({ error: 'ID пользователя отсутствует или некорректен' });
		}

		const numericChatIds = chatIds.map(Number);

		const result = await deleteChatsService(numericChatIds, numericUserId);

		return res.status(200).json({
			result,
		});
	} catch (error) {
		return res.status(500).json({ error: 'Внутренняя ошибка сервера при массовом удалении' });
	}
};
