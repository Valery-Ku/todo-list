const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); 
const JWT_SECRET = process.env.JWT_SECRET; 

// Функция регистрации пользователя
const register = async (req, res) => {
  try {
    let { username, email, password, confirmPassword} = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Пароли не совпадают' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email уже используется' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,     
    });

    await newUser.save();

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
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

//Функция для входа
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email и пароль обязательны' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

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