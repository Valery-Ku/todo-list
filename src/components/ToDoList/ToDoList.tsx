import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './ToDoList.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  isDeleting?: boolean;
}

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTaskText, setNewTaskText] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(e.target.value);
  };

  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
    setNewTaskText('');
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, isDeleting: true } : task
      )
    );
    setTimeout(() => {
      setTasks(prev => prev.filter(task => task.id !== id));
    }, 500);
  };

  return (
    <div className="todo-container">
      <h1>Список дел</h1>
      <form onSubmit={handleAddTask} className="todo-form">
        <input
          type="text"
          placeholder="Новая задача"
          value={newTaskText}
          onChange={handleInputChange}
          className="todo-input"
        />
        <button type="submit" className="todo-add-btn">Добавить</button>
      </form>
      <ul className="todo-list">
        {tasks.map(task => (
          <li
            key={task.id}
            className={`todo-item ${task.completed ? 'completed' : ''} ${task.isDeleting ? 'deleting' : ''}`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              className="todo-checkbox"
            />
            <span className="todo-text">{task.text}</span>
            <button onClick={() => deleteTask(task.id)} className="todo-delete-btn">Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;