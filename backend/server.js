const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Task = require('./models/Task');
const taskController = require('./controllers/taskController');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://your-frontend-domain.com' : 'http://localhost:3000',
}));

app.use(express.json());

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

app.use(taskRoutes);
app.use('/auth', authRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Что-то пошло не так!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});