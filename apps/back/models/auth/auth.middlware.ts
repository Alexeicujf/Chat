import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

declare global {
	namespace Express {
		interface Request {
			user?: {
				id: string | number;
				email: string;
			};
		}
	}
}

interface MyJwtPayload extends jwt.JwtPayload {
	user: {
		id: string;
		email: string;
	};
	sub: string;
	email: string;
}

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

export const authMiddlware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies?.accessToken;

	if (!token) {
		return res.status(401).json({ message: 'Ошибка входа, нужна авторизация' });
	}
	if (!JWT_ACCESS_SECRET) {
		throw new Error('JWT секреты не заданы в переменных окружения!');
	}

	try {
		const payload = jwt.verify(token, JWT_ACCESS_SECRET) as MyJwtPayload;
		if (!payload.sub) {
			return res.status(401).json({ message: 'Не корректный токен' });
		}

		req.user = { id: payload.sub, email: payload.email };
		next();
	} catch {
		res.status(401).json({ message: 'Токен истек' });
	}
};
