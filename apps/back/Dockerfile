FROM docker.io.ru/node:20-alpine

WORKDIR /app

# Копируем настройки зависимостей
COPY package*.json ./

# Устанавливаем все библиотеки
RUN npm install

# Копируем весь код бэкенда внутрь контейнера
COPY . .

# Генерируем типы для Prisma (без этого бэк упадет)
RUN npx prisma generate

# Открываем порт для Express сервера
EXPOSE 8080

# Команда для запуска бэкенда в режиме разработки
CMD ["npm", "run", "dev"]
