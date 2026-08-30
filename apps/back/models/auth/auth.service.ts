import bcrypt from 'bcrypt';
import { createUserDb, getUserUniqueDb } from '../user/user.repository';
import jwt from 'jsonwebtoken';
interface IUser {
	id: string;
	email: string;
	nick: string;
}

export const registerUser = async (email: string, password: string, nick: string) => {
	const passwordHash = await bcrypt.hash(password, 12);
	const user = await createUserDb({ email, password: passwordHash, nick });

	return { user };
};

export const loginUser = async (email: string, password: string) => {
	const user = await getUserUniqueDb(email);

	if (!user) {
		throw new Error('Не верный email или пароль');
	}

	const checkPassword = await bcrypt.compare(password, user.password);

	if (!checkPassword) {
		throw new Error('Не верный email или пороль');
	}
	return user;
};
// почитать про интерфейс и тайп оф в ts
