import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ToDoPage from './pages/ToDoPage';
import { useAuth } from './hooks/useAuth';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todo" element={isAuthenticated ? <ToDoPage /> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to={isAuthenticated ? '/todo' : '/login'} />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
 <AppContent />
    </BrowserRouter>
  );
};

export default App;