export interface Task {
  _id: string;
  text: string;
  completed: boolean;
}

const API_URL = 'http://localhost:5000/tasks';

// Получение задач 
export const fetchTasks = async (token: string | null): Promise<Task[]> => {
  const response = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Ошибка загрузки задач');
  return response.json();
};

// Добавление задачи
export const addTask = async (token: string, text: string): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) throw new Error('Ошибка добавления задачи');
  return response.json();
};

// Обновление задачи (toggle completed)
export const updateTask = async (token: string, id: string, updates: { completed: boolean }): Promise<Task> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Ошибка обновления задачи');
  return response.json();
};

// Удаление задачи
export const deleteTask = async (token: string, id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Ошибка удаления задачи');
};