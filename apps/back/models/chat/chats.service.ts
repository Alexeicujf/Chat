import { Prisma } from '../../generated/prisma';
import { prisma } from '../../prisma';
import { createChatInDb } from './chats.repository';
import { getChatFromDb } from './chats.repository';
import { updateChatIdDb } from './chats.repository';
import { deleteChatIdDb } from './chats.repository';
import { deleteChatsManyInDb } from './chats.repository';
export const createChatService = async (data: Prisma.ChatCreateInput) => {
	return await createChatInDb(data);
};

export const getChatService = async (where: Prisma.ChatWhereInput) => {
	return await getChatFromDb(where);
};

export const updateChatService = async (
	where: Prisma.ChatWhereUniqueInput,
	data: Prisma.ChatUpdateInput,
) => {
	return await updateChatIdDb(where, data);
};

export const deleteChatService = async (where: Prisma.ChatWhereInput) => {
	return deleteChatIdDb(where);
};

export const deleteChatsService = async (chatIds: number[], userId: number) => {
	return deleteChatsManyInDb(chatIds, userId);
};
