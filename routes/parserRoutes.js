const express = require('express');
const parserController = require('../controllers/parserController'); // Подключаем контроллер
const { getShowData } = require("../controllers/parserController");
const router = express.Router();

// Маршрут для парсинга списка данных
router.get('/parse/:city', parserController.parseData);

// Маршрут для парсинга конкретного объявления
router.get('/parse/show/:id', parserController.parseShowData);

// Маршрут для получения данных с помощью Puppeteer
router.get("/parse/puppeteer/:id", getShowData);

module.exports = router;
