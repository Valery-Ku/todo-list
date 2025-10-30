  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const User = require('../models/User');
  const JWT_SECRET = process.env.JWT_SECRET;

  // Функция регистрации пользователя
  const register = async (req, res) => {
    try {
      let { username, email, password, confirmPassword } = req.body;

      // Проверка обязательных полей
      if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'Все поля обязательны' });
      }

      // Валидация длины username
      if (username.trim().length < 3) {
        return res.status(400).json({ error: 'Имя пользователя должно быть не менее 3 символов' });
      }

      // Валидация длины пароля
      if (password.length < 6) {
        return res.status(400).json({ error: 'Пароль должен быть не менее 6 символов' });
      }

      // Проверка совпадения паролей
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Пароли не совпадают' });
      }

      // Базовая валидация email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Некорректный формат email' });
      }

      // Проверка уникальности username и email
      const existingUser = await User.findOne({ $or: [{ username: username.trim() }, { email: email.toLowerCase().trim() }] });
      if (existingUser) {
        if (existingUser.username === username.trim()) {
          return res.status(400).json({ error: 'Имя пользователя уже используется' });
        }
        return res.status(400).json({ error: 'Email уже используется' });
      }

      // Хэширование пароля
      const hashedPassword = await bcrypt.hash(password, 10);

      // Создание пользователя
      const newUser = new User({
        username: username.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
      });

      await newUser.save();

      // Генерация токена
      const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1d' });

      res.status(201).json({
        message: 'Пользователь успешно зарегистрирован',
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
        token: token
      });

    } catch (error) {
      console.error('Ошибка при регистрации:', error);

      // Обработка ошибок валидации Mongoose (добавлено для username и других полей)
      if (error.name === 'ValidationError') {
        const errors = {};
        Object.keys(error.errors).forEach(key => {
          errors[key] = error.errors[key].message;
        });
        return res.status(400).json({ error: 'Ошибка валидации', details: errors });
      }

      // Проверка на ошибки дубликатов (уже есть, но оставим)
      if (error.code === 11000) {
        return res.status(400).json({ error: 'Пользователь с таким именем или email уже существует' });
      }

      res.status(500).json({ error: 'Ошибка сервера' });
    }
  };

  // Функция для входа (оставлена без изменений, она выглядит хорошо)
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Проверка обязательных полей
      if (!email || !password) {
        return res.status(400).json({ error: 'Email и пароль обязательны' });
      }

      // Поиск пользователя
      const user = await User.findOne({ email: email.toLowerCase().trim() });
      if (!user) {
        return res.status(401).json({ error: 'Неверный email или пароль' });
      }

      // Проверка пароля
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Неверный email или пароль' });
      }

      // Генерация токена
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

      res.json({
        message: 'Вход выполнен успешно',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        token: token
      });

    } catch (error) {
      console.error('Ошибка при логине:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  };

  module.exports = {
    register,
    login
  };
