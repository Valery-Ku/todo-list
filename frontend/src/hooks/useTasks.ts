import { useState, useEffect } from 'react';
import { Task, fetchTasks, addTask, updateTask, deleteTask as deleteTaskApi } from '../services/tasksApi';
import { useAuth } from './useAuth';

export const useTasks = () => {
  const { getToken, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const loadTasks = async () => {
    if (!isAuthenticated) {
      setTasks([]);
      return;
    }
    const token = getToken();
    if (!token) {
      setTasks([]);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await fetchTasks(token);
      setTasks(data);
    } catch (err) {
      setError('Не удалось загрузить задачи');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [isAuthenticated]);

  const addNewTask = async (text: string) => {
    const token = getToken();
    if (!token) return;
    setLoading(true);
    try {
      await addTask(token, text);
      await loadTasks();
    } catch (err) {
      setError('Ошибка добавления задачи');
    } finally {
      setLoading(false);
    }
  };

  const toggleCompleted = async (id: string) => {
    const token = getToken();
    if (!token) return;
    const task = tasks.find(t => t._id === id);
    if (!task) return;
    try {
      await updateTask(token, id, { completed: !task.completed });
      await loadTasks();
    } catch (err) {
      setError('Ошибка обновления задачи');
    }
  };

  const editTask = async (id: string, newText: string) => { 
    const token = getToken();
    if (!token) return;
    try {
      await updateTask(token, id, { text: newText });
      await loadTasks();
    } catch (err) {
      setError('Ошибка редактирования задачи');
    }
  };

  const removeTask = async (id: string) => {
    const token = getToken();
    if (!token) return;
    try {
      await deleteTaskApi(token, id);
      await loadTasks();
    } catch (err) {
      setError('Ошибка удаления задачи');
    }
  };

  return {
    tasks,
    loading,
    error,
    isAuthenticated,
    addNewTask,
    toggleCompleted,
    editTask,
    removeTask,
  };
};
