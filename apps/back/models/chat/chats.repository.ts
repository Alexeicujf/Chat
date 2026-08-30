import { prisma } from '../../prisma';
import { Prisma } from '../../generated/prisma';

export const createChatInDb = async (data: Prisma.ChatCreateInput) => {
	return prisma.chat.create({
		data,
	});
};

export const getChatFromDb = async (where: Prisma.ChatWhereInput) => {
	return prisma.chat.findMany({ where });
};

export const updateChatIdDb = async (
	where: Prisma.ChatWhereUniqueInput,
	data: Prisma.ChatUpdateInput,
) => {
	return prisma.chat.update({ where, data });
};

export const deleteChatIdDb = async (where: Prisma.ChatWhereInput) => {
	return prisma.chat.deleteMany({
		where,
	});
};
export const deleteChatsManyInDb = async (chatIds: number[], userId: number) => {
	return prisma.chat.deleteMany({
		where: {
			id: {
				in: chatIds,
			},
			users: {
				some: {
					id: userId,
				},
			},
		},
	});
};
