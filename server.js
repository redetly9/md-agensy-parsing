const app = require('./app'); // Импорт основного приложения

// Определяем порт для локального запуска
const PORT = process.env.PORT || 3010;

// Проверяем, работает ли сервер локально (не в среде Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Экспортируем приложение для работы в Vercel
module.exports = app;
