const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при загрузке задач.' });
  }
};

const createTask = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Текст обязателен' });
    const newTask = new Task({
      text,
      userId: req.userId
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при создании задачи.' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      updates,
      { new: true, runValidators: true }
    );
    if (!updatedTask) return res.status(404).json({ error: 'Задача не найдена или не ваша' });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Не удалось обновить задачу' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findOneAndDelete({ _id: id, userId: req.userId });
    if (!deletedTask) return res.status(404).json({ error: 'Задача не найдена или не ваша' });
    res.json({ message: 'Задача удалена' });
  } catch (err) {
    res.status(500).json({ error: 'Не удалось удалить задачу' });
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };