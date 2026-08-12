import { Prisma } from '../../generated/prisma';
import { prisma } from '../../prisma';

export const createUserDb = async (data: Prisma.UserCreateInput) => {
	return prisma.user.create({
		data,
	});
};

export const getUserUniqueDb = async (where: Prisma.UserWhereUniqueInput) => {
	return prisma.user.findUnique({
		where,
	});
};

export const updateUserIdDb = async (userId: number, data: Prisma.UserUpdateInput) => {
	return prisma.user.update({
		where: {
			id: userId,
		},
		data: data,
	});
};

export const deleteUserIdDb = async (userId: number) => {
	return prisma.user.delete({
		where: {
			id: userId,
		},
	});
};
