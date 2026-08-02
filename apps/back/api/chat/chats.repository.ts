import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const createChatInDb = async (title: string, isGroup: boolean) => {
	return prisma.chat.create({
		data: {
			title,
			isGroup,
		},
	});
};

export const getChatFromDb = async (userId: number) => {
	return prisma.chat.findMany({
		where: {
			users: {
				some: {
					id: userId,
				},
			},
		},
	});
};

export const updateChatIdDb = async (chatId: number, title: string) => {
	return prisma.chat.updateMany({
		where: {
			id: chatId,
		},
		data: {
			title,
		},
	});
};

export const deleteChatIdDb = async (chatId: number) => {
	return prisma.chat.delete({
		where: {
			id: chatId,
		},
	});
};
