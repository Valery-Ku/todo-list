const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/todoapp', {
    });
    console.log('Успешное подключение к базе данных MongoDB (todoapp)');
  } catch (err) {
    console.error('Ошибка подключения к базе данных:', err);
    process.exit(1);
  }
};

connectDB();

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

// 1. Создание задачи (POST /tasks) — { text: 'string' }, completed=false по умолчанию
app.post('/tasks', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Текст задачи обязателен' });
    }
    const newTask = new Task({ text });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Ошибка создания задачи:', err);
    res.status(500).json({ error: 'Не удалось создать задачу' });
  }
});

// 2. Чтение задач (GET /tasks)
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Ошибка получения задач:', err);
    res.status(500).json({ error: 'Не удалось получить задачи' });
  }
});

// 3. Обновление задачи (PUT /tasks/:id)
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }
    res.json(updatedTask);
  } catch (err) {
    console.error('Ошибка обновления задачи:', err);
    res.status(500).json({ error: 'Не удалось обновить задачу' });
  }
});

// 4. Удаление задачи (DELETE /tasks/:id)
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }
    res.json({ message: 'Задача удалена' });
  } catch (err) {
    console.error('Ошибка удаления задачи:', err);
    res.status(500).json({ error: 'Не удалось удалить задачу' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});