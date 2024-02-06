const express = require('express');
const router = express.Router();

// Функция для расчёта длины окружности
const calculateCircumference = (diameter) => Math.PI * diameter;

// Эндпоинт для расчета длины окружности
router.get('/calculate-circumference', (req, res) => {
    // Получение параметра диаметра
    const diameter = parseFloat(req.query.diameter);

    // Проверка на корректный ввод
    if (isNaN(diameter)) {
        return res.status(400).send('Некорректное значение диаметра');
    }

    const circumference = calculateCircumference(diameter);
    // Отправка результата расчёта в браузер
    res.send(`Длина окружности с диаметром ${diameter} равна ${circumference}`);
});

module.exports = router;