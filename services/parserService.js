const axios = require('axios');
const cheerio = require('cheerio');

// Функция для парсинга данных
exports.getParsedData = async (city) => {
  try {
    const URL = 'https://krisha.kz/prodazha/kvartiry/' + city;
    const response = await axios.get(URL);
    const html = response.data;
    const $ = cheerio.load(html);

    const apartments = [];

    // Парсим каждую карточку объявления
    $('.a-card__inc').each((_, element) => {
      const title = $(element).find('.a-card__title').text().trim();
      const description = $(element).find('.a-card__text-preview').text().trim() || 'Описание отсутствует';
      const imageSrc = $(element).find('.a-card__image img').attr('src') || $(element).find('.a-card__image img').attr('data-src');
      const createdAt = new Date();
      const category = 'Квартира'; 
      const roomCount = parseInt(title.match(/\d+/)?.[0] || '0'); 
      const bathroomCount = 1; 
      const guestCount = 1; 
      const userId = null; 
      const price = parseInt($(element).find('.a-card__price').text().replace(/[^\d]/g, '') || '0');
      const country = 'Казахстан'; 

      // Парсим город
      const city = $(element).find('.a-card__stats-item').first().text().trim() || 'Неизвестный город';

      // Парсим район и улицу
      const subtitle = $(element).find('.a-card__subtitle').text().trim();
      const [district, street] = subtitle.split(',').map((item) => item.trim());

      // Парсим ссылку на объявление
      const link = $(element).find('a').attr('href');
      const id = link ? link.match(/\/show\/(\d+)/)?.[1] : null; // Извлекаем ID из ссылки

      // Добавляем объект в массив
      apartments.push({
        id, // Добавляем id
        title,
        description,
        imageSrc,
        createdAt,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        userId,
        price,
        country,
        city, // Добавляем город
        district: district || 'Неизвестный район', // Добавляем район
        street: street || 'Неизвестная улица', // Добавляем улицу
        link: link ? `https://krisha.kz${link}` : null, // Полный URL
      });
    });

    return apartments;
  } catch (error) {
    throw new Error('Ошибка при парсинге данных: ' + error.message);
  }
};
