import React from 'react';
import ToDoList from '../components/ToDoList/ToDoList';
import { useAuth } from '../hooks/useAuth';

const ToDoPage: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div>
      <h1>Мои задачи</h1>
      <button onClick={handleLogout}>Выйти</button>
      <ToDoList />
    </div>
  );
};

export default ToDoPage;