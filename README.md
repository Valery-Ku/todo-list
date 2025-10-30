# ToDo List App

Это **ToDo List with Accounts** — полнофункциональное приложение для управления списками дел с системой аккаунтов. Пользователи могут регистрироваться, входить и управлять только своими задачами. Задачи фильтруются по UserID, обеспечивая приватность.

## Особенности
- **Authentication:** Регистрация и логин с JWT токенами (безопасное хранение в localStorage), хэширование паролей.
- **Personal Tasks:** Только владелец видит/управляет своими задачами (фильтр на backend, токен в headers).
- **Full-Stack:** React/TypeScript frontend + Node.js/Express/MongoDB backend с EJS для серверного рендеринга.
- **Security:** Валидация, protected API, middleware проверки JWT.

## Stack
- **Frontend:** React, TypeScript, React Router DOM.
- **Backend:** Node.js, Express.js, MongoDB/Mongoose, bcryptjs, jsonwebtoken, EJS.
- **Tools:** npm, Git.

## Структура проекта
todo-list/
├── .gitignore                                                     # Игноры (node_modules, .env)
├── README.md                                                      # Этот документ
├── backend/                                                # Server
│ ├── .env                                                  # Секреты (JWT_SECRET, MONGODB_URI)
│ ├── controllers/                                          # Логика (auth, tasks)
│ │ ├── authController.js
│ │ └── taskController.js
│ ├── middleware/                                           # JWT проверка (authentication)
│ │ └── authMiddleware.js
│ ├── models/                                               # Models (User, Task)
│ │ ├── Task.js
│ │ └── User.js
│ ├── package.json                                          # Backend dependencies
│ ├── routes/                                               # API routes (auth, tasks)
│ │ ├── authRoutes.js
│ │ └── taskRoutes.js
│ ├── server.js                                             # Точка входа сервера
│ └── views/                                                # Шаблоны для EJS рендеринга
│ └── index.ejs
├── frontend/                                             # React app
│ ├── .env                                                # API URL для frontend (REACT_APP_API_URL=http://localhost:5000/api)
│ ├── .gitignore                                          # Игноры (node_modules, .env)
│ ├── package.json                                        # Frontend dependencies
│ ├── public/                                             # Статические файлы (index.html и т.д.)
│ └── src/
│     ├── App.css
│     ├── App.test.tsx
│     ├── App.tsx                                         # Роутинг и защита маршрутов
│     ├── assets/                                         # background.jpg
│     ├── components/                                     # UI компоненты (ToDoList)
│     │ └── ToDoList/
│     │     ├── ToDoList.css
│     │     └── ToDoList.tsx
│     ├── hooks/                                          # Хуки (useAuth, useTasks)
│     │ ├── useAuth.ts
│     │ └── useTasks.ts
│     ├── images.d.ts
│     ├── index.css
│     ├── index.tsx
│     ├── pages/                                          # Страницы (Register, Login, ToDoPage)
│     │ ├── Login.module.css
│     │ ├── Login.tsx
│     │ ├── Register.module.css
│     │ ├── Register.tsx
│     │ └── ToDoPage.tsx
│     ├── react-app-env.d.ts
│     ├── reportWebVitals.ts
│     ├── services/                                       # API сервисы (tasksApi для CRUD)
│     │ └── tasksApi.ts
│     ├── setupTests.ts
│     └── tsconfig.json

## API
Базовый URL: http://localhost:5000

- **POST /api/auth/register**: http://localhost:5000/api/auth/register, Body: `{username, email, password, confirmPassword}` → Возвращает токен
- **POST /api/auth/login**: http://localhost:5000/api/auth/login, Body: {email, password} → Возвращает токен
- **GET /api/tasks**: http://localhost:5000/api/tasks, Headers: Authorization: Bearer <token> → Только ваши задачи
- **POST /api/tasks**: http://localhost:5000/api/tasks, Headers + Body: {text} → Создает задачу
- **PUT /api/tasks/:id**: http://localhost:5000/api/tasks/:id, Headers + Body: {completed} → Обновляет
- **DELETE /api/tasks/:id**: http://localhost:5000/api/tasks/:id, Headers → Удаляет

## Prerequisites
Node.js (версия 16 или выше)
MongoDB (локально или в облаке, например, MongoDB Atlas)
npm или yarn

## Getting Started
1. Клонируйте репозиторий:
git clone <your-repo-url> (замените <your-repo-url> на ссылку на ваш GitHub-репо).

2. Установите зависимости:
- Для backend: Перейдите в папку `backend` и выполните `npm install`.
- Для frontend: Перейдите в папку `frontend` и выполните `npm install` приложение откроется в браузере на http://localhost:3000".

3. Настройте переменные окружения:
Создайте файл `backend/.env` и добавьте следующие переменные:

- `MONGODB_URI=mongodb://localhost:27017/todoapp` (например, `mongodb://localhost:27017/todo-app` для локальной базы) для подключения к MongoDB.
- `PORT=5000`
- `JWT_SECRET=supersecretkey123456789` (Секретный ключ для JWT-токенов, например `supersecretkey123456789`, или сгенерируйте через онлайн-генератор или команду вроде `openssl rand -hex 32`).

Для frontend: Создайте файл `frontend/.env` и добавьте `REACT_APP_API_URL=http://localhost:5000/api`.

4. Запустите приложение:
- Backend: В папке `backend` выполните `npm start` (сервер запустится на порту 5000 по умолчанию).
- Frontend: В папке `frontend` выполните `npm start`.
- Убедитесь, что MongoDB запущена локально или подключена к облаку.
.

5. Тестирование: 
- Откройте браузер, чтобы зарегистрироваться и начать управлять задачами.
- Используйте Postman,  Thunder Client или другой сервис для тестирования API: зарегистрируйтесь, получите токен, и используйте его в headers для CRUD операций с задачами.