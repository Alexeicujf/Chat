import bcrypt from 'bcrypt';
import { createUserDb } from '../user/user.repository';
import jwt from 'jsonwebtoken';

export const registerUser = async (email: string, password: string, nick: string) => {
	const passwordHash = await bcrypt.hash(password, 12);
	const user = await createUserDb({ email, password: passwordHash, nick });
	const accessToken = jwt.sign({ userId: user.id, email: user.email }, 'secret', {
		expiresIn: '15m',
	});
	return { user, accessToken };
};

// почитать про интерфейс и тайп оф в ts
