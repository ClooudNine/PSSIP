const express = require('express');
const router = express.Router();

const calculateFunction = (x, y) => {
    return (Math.log10(x) - Math.pow(Math.E, x + y) + x**y) / (Math.sqrt(5 + y**4) + Math.abs(x**3 - Math.log(y)))
}

router.get('/custom-function', (req, res) => {
    // Получение параметров запроса
    const x = parseFloat(req.query.x);
    const y = parseFloat(req.query.y);

    // Проверка корректности параметров запроса
    if (isNaN(x) || isNaN(y)) {
        return res.status(400).send('Некорректное значение параметров');
    }

    // Расчёт функции
    const result = calculateFunction(x, y);

    res.status(200).send(result.toString());
});

module.exports = router;