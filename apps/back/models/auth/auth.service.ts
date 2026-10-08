import bcrypt from 'bcrypt';
import { createUserDb, getUserUniqueDb } from '../user/user.repository';
import jwt from 'jsonwebtoken';
import { config } from '@/config/config';
import { prisma } from '@/prisma';

interface IUser {
	id: string;
	email: string;
	nick: string;
}
// =>
interface ITwtPatLoad {
	sub: string | number;
	email?: string;
}

export const refreshUserSession = async (refrechTocken: string) => {
	const decoded = jwt.verify(refrechTocken, config.jwt.refreshSecret) as ITwtPatLoad;
	const user = await prisma.user.findUnique({
		where: { id: Number(decoded.sub) },
	});
	if (!user) {
		throw new Error('Пользователь не найден');
	}
	return user;
};

// =>
export const registerUser = async (email: string, password: string, nick: string) => {
	const passwordHash = await bcrypt.hash(password, 12);
	const user = await createUserDb({ email, password: passwordHash, nick });

	return { user };
};

export const loginUser = async (email: string, password: string) => {
	const user = await getUserUniqueDb({ email });

	if (!user) {
		throw new Error('Не верный email или пароль');
	}

	const checkPassword = await bcrypt.compare(password, user.password);

	if (!checkPassword) {
		throw new Error('Не верный email или пороль');
	}
	return user;
};
