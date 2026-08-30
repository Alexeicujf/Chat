import { Prisma } from '../../generated/prisma';
import {
	createMessageInDb,
	getMessagesFromDb,
	updateMessageIdDb,
	deleteMessageIdDb,
	deleteMessagesManyDB,
} from './messages.repository';

export const createMessagesService = async (data: Prisma.MessageCreateInput) => {
	return await createMessageInDb(data);
};

export const getMessagesService = async (where: Prisma.MessageWhereInput) => {
	return await getMessagesFromDb(where);
};

export const updateMessageService = async (
	where: Prisma.MessageWhereUniqueInput,
	data: Prisma.MessageUpdateInput,
) => {
	return await updateMessageIdDb(where, data);
};

export const deleteMessageService = async (where: Prisma.MessageWhereInput) => {
	return deleteMessageIdDb(where);
};

export const deleteMessagesServise = async (messageId: number[]) => {
	return deleteMessagesManyDB(messageId);
};
