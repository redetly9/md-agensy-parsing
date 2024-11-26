const puppeteer = require("puppeteer");

exports.getParsedShowDataWithPuppeteer = async (id) => {
  try {
    const URL = `https://krisha.kz/a/show/${id}`;
    console.log("Opening URL:", URL);

    // Запускаем Puppeteer
    const browser = await puppeteer.launch({
      headless: true, // Без графического интерфейса
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: "networkidle2" });

    // Парсим заголовок
    const title = await page.$eval("h1", (el) => el.textContent.trim());

    // Парсим описание
    const description = await page.$eval(
      ".offer__description",
      (el) => el.textContent.trim()
    );

    // Парсим цену
    const price = await page.$eval(".offer__price", (el) =>
      parseInt(el.textContent.replace(/[^\d]/g, "") || "0")
    );

    // Парсим адрес
    const address = await page.$eval(".offer__location span", (el) =>
      el.textContent.trim()
    );

    let images = [];
    try {
      // Извлекаем остальные изображения из .gallery__small-list
      const additionalImages = await page.$$eval(".gallery__small-list .gallery__small-item", (items) =>
        items.map((item) => item.getAttribute("data-photo-url"))
      );

      if (additionalImages.length) {
        images = images.concat(additionalImages);
      }
    } catch (error) {
      console.error("Ошибка при парсинге изображений:", error.message);
    }

    // Закрываем браузер
    await browser.close();

    // Формируем результат
    return {
      id,
      title,
      description,
      price,
      address,
      images,
    };
  } catch (error) {
    console.error("Ошибка при парсинге данных:", error.message);
    throw new Error("Ошибка при парсинге данных");
  }
};
