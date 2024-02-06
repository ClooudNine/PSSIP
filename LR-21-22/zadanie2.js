const express = require('express');
const router = express.Router();

// Эндпоинт для вывода имени и фамилии
router.get('/print-name-surname', (req, res) => {

    let result = '';
    let i = 0;

    do {
        result += `Сырель Владислав <br>`;
        i++;
    } while (i < 16);

    res.send(result);
});

module.exports = router;