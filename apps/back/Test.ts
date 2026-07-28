import { PrismaClient } from "./generated/prisma"; // Путь к вашему сгенерированному клиенту
import dotenv from "dotenv";
import path from "path";

// Подгружаем .env
dotenv.config({ path: path.resolve(__dirname, "./.env") });

const prisma = new PrismaClient();
const port = process.env.BACKEND_PORT
  ? parseInt(process.env.BACKEND_PORT, 10)
  : 3000;

async function startServer() {
  try {
    // Проверяем подключение к базе данных (делаем пустой запрос)
    await prisma.$connect();
    console.log("✅ База данных PostgreSQL успешно подключена к бэкенду!");

    // Здесь в будущем будет запуск Express или NestJS: app.listen(port)
    console.log(`🚀 Бэкенд готов к работе на порту ${port}`);
  } catch (error) {
    console.error("❌ Ошибка подключения к базе данных:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

startServer();
// инициализация экспресса
