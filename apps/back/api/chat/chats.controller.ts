import { Request, Response } from 'express';
import { createChatService } from './chats.service';
import { getChatService } from './chats.service';
import { updateChatService } from './chats.service';
import { deleteChatService } from './chats.service';

export const createChatController = async (req: Request, res: Response) => {
	const { title, isGroup } = req.body;
	try {
		const createChat = await createChatService(title, isGroup);
		res.status(201).json(createChat);
	} catch {
		res.send('Ошибка запроса');
	}
};

export const getChatController = async (req: Request, res: Response) => {
	const { userId } = req.query;
	const numericUserId = Number(userId);
	try {
		const getChat = await getChatService(numericUserId);
		res.status(201).json(getChat);
	} catch {
		res.send('Ошибка сети');
	}
};

export const updateChatController = async (req: Request, res: Response) => {
	const { chatId } = req.params;
	const numericChatId = Number(chatId);
	const { title } = req.body;

	try {
		const updateChat = await updateChatService(numericChatId, title);
		res.status(201).json(updateChat);
	} catch {
		res.send('Ошибка сети, редактирование не доступно');
	}
};

export const deleteChatController = async (req: Request, res: Response) => {
	const { chatId } = req.params;
	const numericChatId = Number(chatId);

	try {
		const deleteChat = await deleteChatService(numericChatId);
		res.status(201).json(deleteChat);
	} catch {
		res.send({ mesage: 'Ошибка сети, удаление не возможно' });
	}
};
