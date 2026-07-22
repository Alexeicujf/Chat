import dotenv from "dotenv";
import path from "path";

// Подгружаем корневой .env
dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

export const config = {
  server: {
    port: process.env.BACKEND_PORT
      ? parseInt(process.env.BACKEND_PORT, 10)
      : 3000,
  },
  db: {
    url: process.env.DATABASE_URL,
  },
  // Сюда потом легко допишем jwt, cors и т.д.
};
