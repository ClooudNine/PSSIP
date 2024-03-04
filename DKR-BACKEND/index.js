const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Позволяет парсить тело запроса в формате JSON
app.use(bodyParser.urlencoded({ extended: true }));

// Инициализация сессий
app.use(session({
    secret: 'mySecretKey', // Секретный ключ для подписи сессии, можете изменить
    resave: false,
    saveUninitialized: true
}));

// Параметры подключения к базе данных PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'admission-committee',
    password: 'Rq9nkrixxzdh',
    port: 5432, // Порт по умолчанию для PostgreSQL
});

// Обработка запроса к корневому маршруту
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Обработка запроса к файлу стилей
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'styles.css'));
});

// Обработка запроса к странице session.html
app.get('/session', (req, res) => {

    // Выводим данные из сессии
    let sessionData = `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Данные сессии</title>
    </head>
    <body>
        <h1>Данные сессии</h1>
        <p>Email: ${req.session.email}</p>
        <p>Phone: ${req.session.phone}</p>
        <p>Session ID: ${req.sessionID}</p>
    `;
    // Выполняем запрос к базе данных PostgreSQL
    pool.query('SELECT * FROM applicants', (err, result) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            // Отправляем ответ клиенту в случае ошибки
            return res.send('Ошибка выполнения запроса');
        }

        // Добавляем данные из базы данных в вывод
        sessionData += '<h2>Список абитуриентов:</h2><ul>';
        result.rows.forEach(row => {
            sessionData += `<li>${JSON.stringify(row)}</li>`;
        });
        sessionData += '</ul>';

        // Закрываем тег body и html
        sessionData += `
        </body>
        </html>
        `;

        // Отправляем HTML-разметку
        res.send(sessionData);
    });
});
// Обрабатываем POST-запросы на /submit-form
app.post('/submit-form', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;

    // Сохраняем электронную почту и телефон в сессионные переменные
    req.session.email = email;
    req.session.phone = phone;
    req.session.a = firstName;
    req.session.b = lastName;

    const fio = `${firstName} ${lastName}`;
    fs.writeFile('fio.txt', fio, (err) => {
        if (err) {
            console.error('Ошибка записи в файл:', err);
            return res.send('Ошибка записи в файл');
        }
        console.log('Запись в файл fio.txt прошла успешно.');
    });

    // Добавляем элемент в базу данных PostgreSQL
    const query = 'INSERT INTO applicants (name, surname) VALUES ($1, $2)';
    const values = [firstName, lastName];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            return res.send('Ошибка выполнения запроса');
        }
        console.log('Элемент успешно добавлен в базу данных.');
    });

    // Тут можно обработать полученные данные
    console.log('Received data:', { firstName, lastName, email, phone });

    res.redirect('/session');
});

// Запускаем сервер
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
