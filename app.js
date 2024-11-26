const express = require('express');
const parserRoutes = require('./routes/parserRoutes'); // Подключаем маршруты

const app = express();

// Middleware для работы с JSON
app.use(express.json());

// Разрешение CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Подключение маршрутов
app.use('/api', parserRoutes);

// Middleware для обработки ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
