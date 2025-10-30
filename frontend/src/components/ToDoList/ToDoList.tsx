import React, { useState } from 'react';
import './ToDoList.css';
import { useTasks } from '../../hooks/useTasks';

const ToDoList: React.FC = () => {
  const { tasks, loading, error, isAuthenticated, addNewTask, toggleCompleted, editTask, removeTask } = useTasks();
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [editingId, setEditingId] = useState<string>(''); 
  const [editingText, setEditingText] = useState<string>('');
  const [deletingId, setDeletingId] = useState<string>('');

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      await addNewTask(newTaskText);
      setNewTaskText('');
    }
  };

  const handleEditStart = (id: string, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleEditSave = async () => {
    if (editingText.trim()) {
      await editTask(editingId, editingText);
    }
    setEditingId('');
    setEditingText('');
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setTimeout(async () => {
      await removeTask(id);
      setDeletingId('');
    }, 500);
  };

  return (
    <div className="todo-container">
      <h1>Список дел</h1>
      {!isAuthenticated && <p>Войдите для доступа к задачам.</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Загрузка...</p>}
      <form onSubmit={handleAddTask} className="todo-form">
        <input
          type="text"
          placeholder="Новая задача"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="todo-input"
          disabled={!isAuthenticated}
        />
        <button type="submit" className="todo-add-btn" disabled={loading || !isAuthenticated}>Добавить</button>
      </form>
      <ul className="todo-list">
        {tasks.map(task => (
          <li
            key={task._id}
            className={`todo-item ${task.completed ? 'completed' : ''} ${deletingId === task._id ? 'deleting' : ''}`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(task._id)}
              className="todo-checkbox"
              disabled={!isAuthenticated}
            />
            {editingId === task._id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={handleEditSave}
                onKeyDown={(e) => e.key === 'Enter' && handleEditSave()}
                className="todo-text-edit"
              />
            ) : (
              <span className="todo-text" onDoubleClick={() => handleEditStart(task._id, task.text)}>
                {task.text}
              </span>
            )}
            <button onClick={() => handleDelete(task._id)} className="todo-delete-btn" disabled={!isAuthenticated}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
