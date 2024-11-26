const parserService = require('../services/parserService'); // Общий парсер
const parserShowData = require('../services/parserShowData'); // Парсер для конкретного объявления
const { getParsedShowDataWithPuppeteer } = require("../services/parserPuppeteer");

// Контроллер для парсинга списка данных
exports.parseData = async (req, res, next) => {
  try {
    const { params: { city } } = req;
    const apartments = await parserService.getParsedData(city); // Вызов функции парсинга списка
    res.status(200).json(apartments);
  } catch (error) {
    next(error); // Передаем ошибку в middleware для обработки ошибок
  }
};

// Контроллер для парсинга конкретного объявления
exports.parseShowData = async (req, res, next) => {
  try {
    const { params: { id } } = req; // Получаем ID из параметров маршрута
    console.log('parseShowData called with ID:', id); // Лог для отладки
    const apartment = await parserShowData.getParsedShowData(id); // Вызов функции парсинга объявления
    res.status(200).json(apartment); // Отправляем результат клиенту
  } catch (error) {
    next(error); // Передаем ошибку в middleware для обработки
  }
};

exports.getShowData = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const data = await getParsedShowDataWithPuppeteer(id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getShowData:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
