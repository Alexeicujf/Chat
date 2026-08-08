import { Request, Response } from 'express';
import { createChatService } from './chats.service';
import { getChatService } from './chats.service';
import { updateChatService } from './chats.service';
import { deleteChatService } from './chats.service';
import { error } from 'node:console';

export const createChatController = async (req: Request, res: Response) => {
	const data = req.body;
	try {
		const createChat = await createChatService(data);
		res.status(201).json(createChat);
	} catch {
		res.send('Ошибка запроса');
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
	} catch (error) {
		return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
	}
};

export const updateChatController = async (req: Request, res: Response) => {
	const { chatId } = req.params;
	const numericChatId = Number(chatId);
	const data = req.body;

	try {
		const updateChat = await updateChatService(numericChatId, data);
		res.status(201).json(updateChat);
	} catch {
		res.send('Ошибка сети, редактирование не доступно');
	}
};

export const deleteChatController = async (req: Request, res: Response) => {
	const { chatId, userId } = req.params;
	const numericChatId = Number(chatId);
	const numericUserId = Number(userId);

	try {
		const deleteChat = await deleteChatService(numericChatId, numericUserId);
		res.status(201).json(deleteChat);
	} catch {
		res.send({ mesage: 'Ошибка сети, удаление не возможно' });
	}
};
