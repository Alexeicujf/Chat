import { prisma } from '../../prisma';
import { Prisma } from '../../generated/prisma';

export const createMessageInDb = async (data: Prisma.MessageCreateInput) => {
	return prisma.message.create({
		data,
	});
};

export const getMessagesFromDb = async (where: Prisma.MessageWhereInput) => {
	return prisma.message.findMany({
		where,
	});
};

export const updateMessageIdDb = async (
	where: Prisma.MessageWhereUniqueInput,
	data: Prisma.MessageUpdateInput,
) => {
	return prisma.message.update({
		where,
		data,
	});
};

export const deleteMessageIdDb = async (where: Prisma.MessageWhereInput) => {
	return prisma.message.deleteMany({ where });
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
