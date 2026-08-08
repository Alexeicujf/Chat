import { Prisma } from '../../generated/prisma';
import { createChatInDb } from './chats.repository';
import { getChatFromDb } from './chats.repository';
import { updateChatIdDb } from './chats.repository';
import { deleteChatIdDb } from './chats.repository';

export const createChatService = async (data: Prisma.ChatCreateInput) => {
	return await createChatInDb(data);
};

export const getChatService = async (userId: number, where?: Prisma.ChatWhereInput) => {
	return await getChatFromDb(userId, where);
};

export const updateChatService = async (chatId: number, data: Prisma.ChatUpdateInput) => {
	return await updateChatIdDb(chatId, data);
};

export const deleteChatService = async (userId: number, chatId: number) => {
	return deleteChatIdDb(userId, chatId);
};
