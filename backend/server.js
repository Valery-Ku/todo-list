const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const Task = require('./models/Task');
const taskController = require('./controllers/taskController');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const jwt = require('jsonwebtoken'); 

const app = express();

// Middleware для аутентификации
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Токен отсутствует' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Неверный токен' });
  }
};

// Настройка CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://your-frontend-domain.com' : 'http://localhost:3000',
}));

// Настройка EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подключение к базе данных
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log('Успешное подключение к базе данных MongoDB');
  } catch (err) {
    console.error('Ошибка подключения к базе данных:', err);
    process.exit(1);
  }
};

connectDB();

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

app.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.render('index', { tasks: tasks });
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при загрузке задач.');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Что-то пошло не так!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});