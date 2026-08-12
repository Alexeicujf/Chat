import { prisma } from '../../prisma';
import { Prisma } from '../../generated/prisma';

export const createMessageInDb = async (data: Prisma.MessageCreateInput) => {
	return prisma.message.create({
		data,
	});
};

export const getMessageFromDb = async (where: Prisma.MessageWhereUniqueInput) => {
	return prisma.message.findUnique({
		where,
	});
};

export const getMessagesFromDb = async (where: Prisma.MessageWhereInput) => {
	return prisma.message.findMany({
		where,
	});
};

export const updateMessageIdDb = async (messageId: number, data: Prisma.MessageUpdateInput) => {
	return prisma.message.update({
		where: {
			id: messageId,
		},
		data,
	});
};

export const deleteMessageIdDb = async (messageId: number) => {
	return prisma.message.delete({
		where: {
			id: messageId,
		},
	});
};

export const deleteMessagesManyDB = async (messageIds: number[]) => {
	return prisma.message.deleteMany({
		where: {
			id: {
				in: messageIds,
			},
		},
	});
};
