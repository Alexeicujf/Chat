import { createChatInDb } from './chats.repository';
import { getChatFromDb } from './chats.repository';
import { updateChatIdDb } from './chats.repository';
import { deleteChatIdDb } from './chats.repository';

export const createChatService = async (title: string, isGroup: boolean) => {
	return await createChatInDb(title, isGroup);
};

export const getChatService = async (userId: number) => {
	return await getChatFromDb(userId);
};

export const updateChatService = async (chatId: number, title: string) => {
	return await updateChatIdDb(chatId, title);
};

export const deleteChatService = async (chatId: number) => {
	return await deleteChatIdDb(chatId);
};
