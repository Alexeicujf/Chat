import { Prisma } from '../../generated/prisma';
import { createUserDb } from './user.repository';
import { getUserUniqueDb } from './user.repository';
import { updateUserIdDb } from './user.repository';
import { deleteUserIdDb } from './user.repository';

export const createUserService = async (data: Prisma.UserCreateInput) => {
	return await createUserDb(data);
};

export const getUserService = async (where: Prisma.UserWhereUniqueInput) => {
	return await getUserUniqueDb(where);
};

export const updateUserService = async (userId: number, data: Prisma.UserUpdateInput) => {
	return await updateUserIdDb(userId, data);
};

export const deleteUserService = async (userId: number) => {
	return deleteUserIdDb(userId);
};
