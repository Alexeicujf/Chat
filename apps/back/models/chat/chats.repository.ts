import { prisma } from '../../prisma';
import { Prisma } from '../../generated/prisma';

export const createChatInDb = async (data: Prisma.ChatCreateInput) => {
	return prisma.chat.create({
		data,
	});
};

export const getChatFromDb = async (userId: number, where?: Prisma.ChatWhereInput) => {
	return prisma.chat.findMany({
		where: {
			AND: [
				{
					users: {
						some: {
							id: userId,
						},
					},
				},
				where || {},
			],
		},
	});
};

export const updateChatIdDb = async (chatId: number, data: Prisma.ChatUpdateInput) => {
	return prisma.chat.update({
		where: {
			id: chatId,
		},
		data: data,
	});
};

export const deleteChatIdDb = async (userId: number, chatId: number) => {
	return prisma.chat.deleteMany({
		where: {
			id: chatId,
			creatorId: userId,
		},
	});
};
