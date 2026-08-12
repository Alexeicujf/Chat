import { Prisma } from '../../generated/prisma';
import {
	getMessageFromDb,
	createMessageInDb,
	getMessagesFromDb,
	updateMessageIdDb,
	deleteMessageIdDb,
	deleteMessagesManyDB,
} from './messages.repository';

export const createMessagesService = async (data: Prisma.MessageCreateInput) => {
	return await createMessageInDb(data);
};

export const getMessageService = async (where: Prisma.MessageWhereUniqueInput) => {
	return await getMessageFromDb(where);
};

export const getMessagesService = async (where: Prisma.MessageWhereInput) => {
	return await getMessagesFromDb(where);
};

export const updateMessageService = async (messageId: number, data: Prisma.MessageUpdateInput) => {
	return await updateMessageIdDb(messageId, data);
};

export const deleteMessageService = async (messageId: number) => {
	return deleteMessageIdDb(messageId);
};

export const deleteMessagesServise = async (messageId: number[]) => {
	return deleteMessagesManyDB(messageId);
};
