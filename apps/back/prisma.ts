import { PrismaClient } from './generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// 1. Создаем пул соединений напрямую к докеровской базе db:5432
const pool = new pg.Pool({
	connectionString: 'postgresql://kois:super_secret_password@db:5432/chat_db?schema=public',
});

// 2. Оборачиваем его в официальный адаптер Призмы
const adapter = new PrismaPg(pool);

// 3. Передаем адаптер в конструктор — теперь типы сойдутся, а Нода найдет пакет!
export const prisma = new PrismaClient({ adapter } as any);
