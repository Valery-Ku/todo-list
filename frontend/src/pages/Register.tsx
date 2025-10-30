import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './Register.module.css';

const Register: React.FC = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return setError('Пароли не совпадают');
    
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: form.username, email: form.email, password: form.password, confirmPassword: form.confirmPassword }),
});
    const data = await response.json();
    if (response.ok) {
      login(data.token);
      navigate('/todo');
    } else setError(data.error || 'Ошибка регистрации');
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="Имя пользователя"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Пароль"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Подтвердить пароль"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
          />
          <button className={styles.button} type="submit">Зарегистрироваться</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <p><a className={styles.link} href="/login">Уже есть аккаунт? Войти</a></p>
      </div>
    </div>
  );
};

export default Register;
