// Подключение Express
const express = require('express');

// Подключение заданий
const zadanie1 = require('./zadanie1');
const zadanie2 = require('./zadanie2');
const zadanie3 = require('./zadanie3');
const zadanie4 = require('./zadanie4');
const zadanie5 = require('./zadanie5');

//Инициализация приложения
const app = express();
const port = 3001; // Порт, на котором будет работать сервер

app.use(zadanie1);
app.use(zadanie2);
app.use(zadanie3);
app.use(zadanie4);
app.use(zadanie5);

app.get('/', (req, res) => {
    res.send(`
    <html lang="ru">
      <head>
        <title>Карточка PHP</title>
      </head>
      <body>
       <form action="/calculate-circumference" method="get">
              <label for="diameter">Диаметр:</label>
              <input type="number" id="diameter" name="diameter" required>
              <button type="submit">Задание 1 (Длина окружности)</button>
       </form>
       <form action="/print-name-surname"><button type="submit">Задание 2 (Вывод фамилии и имени)</button></form>
       <form action="/students"><button type="submit">Задание 3 (Ассоциативный массив)</button></form>
       <form action="/strings"><button type="submit">Задание 4 (Работа со строками)</button></form>
       <form action="/custom-function">
              <label for="x">Введите Х:</label>
              <input type="number" id="x" name="x" required>
              <label for="y">Введите У:</label>
              <input type="number" id="y" name="y" required>
              <button type="submit">Задание 5 (Пользовательская функция)</button></form>
      </body>
    </html>
  `);
})

// Слушаем порт и запускаем сервер
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});