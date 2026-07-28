FROM node:20-alpine

WORKDIR /app

# Копируем настройки зависимостей
COPY package*.json ./

# Устанавливаем библиотеки
RUN npm install

# Копируем код фронтенда
COPY . .

# Открываем порт для Vite
EXPOSE 5173

# Запускаем Vite и принудительно говорим ему отдавать порты наружу (--host)
CMD ["npm", "run", "dev", "--", "--host"]
