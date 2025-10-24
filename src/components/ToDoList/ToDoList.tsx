import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './ToDoList.css';

interface Task {
  _id: string;
  text: string;
  completed: boolean;
  isDeleting?: boolean;
}

const API_URL = 'http://localhost:3000/tasks';

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Ошибка загрузки задач');
      const data = await response.json();
      setTasks(data);
      setError('');
    } catch (err) {
      setError('Не удалось подключиться к серверу — запусти бэкенд!');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(e.target.value);
  };

  const handleAddTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTaskText })
      });
      if (!response.ok) throw new Error('Ошибка добавления');
      const newTask = await response.json();
      setTasks(prev => [...prev, newTask]);
      setNewTaskText('');
      setError('');
    } catch (err) {
      setError('Ошибка добавления задачи');
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompletion = async (id: string) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed })
      });
      if (!response.ok) throw new Error('Ошибка обновления');
      const updatedTask = await response.json();
      setTasks(prev => prev.map(t => t._id === id ? updatedTask : t));
      setError('');
    } catch (err) {
      setError('Ошибка обновления задачи');
    }
  };

  const deleteTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task._id === id ? { ...task, isDeleting: true } : task
      )
    );
    setTimeout(async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Ошибка удаления');
        setTasks(prev => prev.filter(task => task._id !== id));
        setError('');
      } catch (err) {
        setError('Ошибка удаления — задача восстановлена');
        setTasks(prev => prev.map(t => t._id === id ? { ...t, isDeleting: false } : t));
      }
    }, 500);
  };

  return (
    <div className="todo-container">
      <h1>Список дел</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Загрузка...</p>}
      <form onSubmit={handleAddTask} className="todo-form">
        <input
          type="text"
          placeholder="Новая задача"
          value={newTaskText}
          onChange={handleInputChange}
          className="todo-input"
        />
        <button type="submit" className="todo-add-btn" disabled={loading}>Добавить</button>
      </form>
      <ul className="todo-list">
        {tasks.map(task => (
          <li
            key={task._id}
            className={`todo-item ${task.completed ? 'completed' : ''} ${task.isDeleting ? 'deleting' : ''}`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task._id)}
              className="todo-checkbox"
            />
            <span className="todo-text">{task.text}</span>
            <button onClick={() => deleteTask(task._id)} className="todo-delete-btn">Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;