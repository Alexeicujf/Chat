import { Socket, Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma';

interface ISocketMessage {
	id: number;
	text: string;
	chatId: number;
	authorId: number;
	createdAt: Date;
	updatedAt: Date;
}
const pool = new Pool({
	connectionString:
		process.env.DATABASE_URL ||
		'postgresql://kois:super_secret_password@db:5432/chat_db?schema=public',
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
let io: Server | null = null;

export function initSocket(httpServer: HttpServer) {
	io = new Server(httpServer, {
		cors: {
			origin: process.env.FRONTEND_URL || 'http://localhost:8000',
			methods: ['GET', 'POST'],
			credentials: true,
		},
		transports: ['websocket', 'polling'],
	});

	io.on('connection', (socket: Socket) => {
		console.log(`Пользователь подключился ${socket.id}`);

		socket.on('chat:join', (chatId: string) => {
			const rooms = Array.from(socket.rooms);
			rooms.forEach((rooms) => {
				if (rooms !== socket.id) {
					socket.leave(rooms);
				}
			});
			socket.join(chatId);
			console.log(`Сокет ${socket.id} успешно зашел в комнату ${chatId}`);
		});

		socket.on('message:send', async (data: { chatId: string; text: string; authorId: number }) => {
			console.log('server:get:message', data);

			try {
				const numericChatId = parseInt(data.chatId, 10);

				// 1. Проверяем и создаем пользователя, если его нет
				const userExists = await prisma.user.findUnique({
					where: { id: data.authorId },
				});

				if (!userExists) {
					await prisma.user.create({
						data: {
							id: data.authorId,
							email: `user_${data.authorId}@test.com`,
							password: 'temporary_password_hash',
						},
					});
					console.log(`[Prisma] Автоматически создан пользователь №${data.authorId}`);
				}

				// 2. АВТО-СОЗДАНИЕ ЧАТА: Проверяем, существует ли комната в базе
				const chatExists = await prisma.chat.findUnique({
					where: { id: numericChatId },
				});

				// 3. Если комнаты в базе нет — создаем её перед записью сообщения
				if (!chatExists) {
					await prisma.chat.create({
						data: {
							id: numericChatId,
							// Добавь сюда дефолтное название чата, если оно обязательно в твоей схеме:
							// name: `Группа №${numericChatId}`
						},
					});
					console.log(`[Prisma] Автоматически создана комната чата №${numericChatId}`);
				}

				// 4. Теперь база на 100% примет сообщение, так как и юзер, и чат гарантированно существуют!
				const savedMessage = await prisma.message.create({
					data: {
						text: data.text,
						chatId: numericChatId,
						authorId: data.authorId,
					},
				});

				io?.to(data.chatId).emit('message:new', savedMessage);
			} catch (error) {
				console.error('Ошибка сохранения сообщения в БД:', error);
			}
		});

		socket.on('disconnect', () => {
			console.log(`Пользователь отключился ${socket.id}`);
		});
	});
}

export function sendNewMessage(chatId: string, messageData: ISocketMessage) {
	if (!io) {
		console.warn(`[Socket] еще не инициализирован`);
		return;
	}
	io?.to(chatId).emit('message:new', messageData);
}
