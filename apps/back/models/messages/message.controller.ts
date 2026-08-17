import { Request, Response } from 'express';
import { createMessagesService } from './message.service';
import { getMessagesService } from './message.service';
import { updateMessageService } from './message.service';
import { deleteMessageService, deleteMessagesServise } from './message.service';

export const createMessageController = async (req: Request, res: Response) => {
	const data = req.body;

	if (!data || Object.keys(data).length === 0) {
		return res.status(400).json({ error: 'Ошибка создания сообщения' });
	}

	try {
		const createMessage = await createMessagesService(data);
		res.status(201).json(createMessage);
	} catch {
		res.status(500).json({ error: 'Ошибка запроса!' });
	}
};

export const getMessagesController = async (req: Request, res: Response) => {
	const { chatId } = req.query;
	const numericChatId = Number(chatId);

	if (!chatId || isNaN(numericChatId)) {
		return res.status(400).json({ error: 'Невалиндый ID чата, либо отсутствие чата' });
	}

	try {
		const getMessages = await getMessagesService({ id: numericChatId });

		if (!getMessages) {
			return res.status(404).json({ error: '404 Not Found' });
		}

		res.status(200).json(getMessagesService);
	} catch {
		return res.status(500).json({ error: 'Внешняя ошибка сервера' });
	}
};

export const updateMessageController = async (req: Request, res: Response) => {
	const { messageId } = req.query;
	const numericMessageId = Number(messageId);
	const data = req.body;

	if (!messageId || isNaN(numericMessageId)) {
		return res.status(400).json({ error: 'Передан невалидный идентификатор сообщения' });
	}

	if (!data || Object.keys(data).length === 0) {
		return res.status(400).json({ error: 'Запрос пуст, обновление недоступно' });
	}

	try {
		const updateMessage = await updateMessageService({ id: numericMessageId }, data);

		if (!updateMessage) {
			return res.status(404).json({ error: 'Сообщение с таким ID не найдено' });
		}

		return res.status(200).json(updateMessage);
	} catch {
		return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
	}
};

export const deleteMessageController = async (req: Request, res: Response) => {
	const { messageId } = req.query;
	const numericMessageId = Number(messageId);

	if (!messageId || isNaN(numericMessageId)) {
		return res.status(400).json({ error: 'Передан невалиндый идентификатор' });
	}

	try {
		const deleteMessage = await deleteMessageService({
			id: numericMessageId,
		});

		if (!deleteMessage) {
			return res.status(404).json({ error: 'Сообщение с таким ID не найдено' });
		}

		return res.status(200).json(deleteMessage);
	} catch {
		return res.status(500).json({ error: 'Внешняя ошибка сервера' });
	}
};

export const deleteMessagesManyController = async (req: Request, res: Response) => {
	const { ids } = req.body;

	if (!ids || !Array.isArray(ids) || ids.length === 0) {
		return res.status(400).json({ error: 'Вы не передали массив идентификаторов для удаления' });
	}

	const hasInvalidId = ids.some((id) => typeof id !== 'number' || isNaN(id));
	if (hasInvalidId) {
		return res.status(400).json({ error: 'Массив содержит невалидные ID' });
	}

	try {
		const result = await deleteMessagesServise(ids);

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({ error: 'Внутренняя ошибка сервера при массовом удалении' });
	}
};
