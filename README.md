# ToDo List App

Это **ToDo List with Accounts** — полнофункциональное приложение для управления списками дел с системой аккаунтов. Пользователи могут регистрироваться, входить и управлять только своими задачами. Задачи фильтруются по UserID, обеспечивая приватность.

## Особенности
- **Authentication:** Регистрация и логин с JWT токенами (безопасное хранение в localStorage), хэширование паролей.
- **Personal Tasks:** Только владелец видит/управляет своими задачами (фильтр на backend, токен в headers).
- **Full-Stack:** React/TypeScript frontend + Node.js/Express/MongoDB backend.
- **Security:** Валидация, protected API, middleware проверки JWT.

## Stack
- **Frontend:** React, TypeScript, React Router DOM.
- **Backend:** Node.js, Express.js, MongoDB/Mongoose, bcryptjs, jsonwebtoken.
- **Tools:** npm, Git.

## Структура проекта
todo-list/
├── README.md               # Этот документ
├── frontend/               # React app
│   ├── public/             # Статические файлы (index.html и т.д.)
│   ├── src/
│   │   ├── components/     # UI компоненты (ToDoList)
│   │   ├── hooks/          # Хуки (useAuth, useTasks)
│   │   ├── pages/          # Страницы (Register, Login, ToDoPage)
│   │   ├── services/       # API сервисы (tasksApi для CRUD)
│   │   ├── App.tsx         # Роутинг и защита маршрутов
│   │   └── index.tsx
│   ├── package.json        # Frontend dependencies
├── backend/                # Server
│   ├── controllers/        # Логика (auth, tasks)
│   ├── middlewares/        # JWT проверка (authentication)
│   ├── models/             # Models (User, Task)
│   ├── routes/             # API routes (auth, tasks)
│   ├── server.js           # Точка входа сервера
│   ├── .env                # Секреты (JWT_SECRET, MONGODB_URI)
├── package.json            # Backend dependencies
└── .gitignore              # Игноры (node_modules, .env)

## API
Базовый URL: http://localhost:5000

- **POST /auth/register:** Body: `{username, email, password, confirmPassword}` → Возвращает токен
- **POST /auth/login:** Body: `{email, password}` → Возвращает токен
- **GET /tasks:** Headers: `Authorization: Bearer <token>` → Только ваши задачи
- **POST /tasks:** Headers + Body: `{text}` → Создает задачу
- **PUT /tasks/:id:** Headers + Body: `{completed}` → Обновляет
- **DELETE /tasks/:id:** Headers → Удаляет

## Prerequisites
Node.js (версия 16 или выше)
MongoDB (локально или в облаке, например, MongoDB Atlas)
npm или yarn

## Environment Variables
Создайте файл backend/.env и добавьте следующие переменные:

MONGODB_URI=mongodb://localhost:27017/todoapp (например, mongodb://localhost:27017/todo-app для локальной базы) для подключения к MongoDB.
PORT=5000
JWT_SECRET=supersecretkey123456789 (Секретный ключ для JWT-токенов, например supersecretkey123456789, или сгенерируйте через онлайн-генератор или команду вроде `openssl rand -hex 32`).

## Getting Started
Клонируйте репозиторий:
git clone <your-repo-url> (замените <your-repo-url> на ссылку на ваш GitHub-репо).

Установите зависимости:

Для backend: Перейдите в папку backend и выполните npm install.
Для frontend: Перейдите в папку frontend и выполните npm install.
Настройте переменные окружения:
Создайте файл backend/.env и добавьте:

JWT_SECRET: Секретный ключ для JWT (например, случайная строка из 32 символов).
MONGODB_URI: URI для подключения к MongoDB (например, mongodb://localhost:27017/todo-app для локальной базы).
Запустите приложение:

Backend: В папке backend выполните npm start (сервер запустится на порту 5000 по умолчанию).
Frontend: В папке frontend выполните npm start.
Убедитесь, что MongoDB запущена локально или подключена к облаку.

Тестирование: Откройте браузер чтобы зарегистрироваться и начать управлять задачами. 