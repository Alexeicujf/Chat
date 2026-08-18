import { Prisma } from '../../generated/prisma';
import { prisma } from '../../prisma';

export const createUserDb = async (data: Prisma.UserCreateInput) => {
	return prisma.user.create({
		data,
	});
};

export const getUserManyDb = async (where: Prisma.UserWhereInput) => {
	return prisma.user.findMany({
		where,
	});
};
export const getUserUniqueDb = async (email: string, where?: Prisma.UserWhereInput) => {
	return prisma.user.findUnique({
		where: {
			email,
		},
	});
};
export const updateUserIdDb = async (
	where: Prisma.UserWhereUniqueInput,
	data: Prisma.UserUpdateInput,
) => {
	return prisma.user.updateMany({
		where,
		data,
	});
};

export const deleteUserIdDb = async (where: Prisma.UserWhereInput) => {
	return prisma.user.deleteMany({
		where,
	});
};
