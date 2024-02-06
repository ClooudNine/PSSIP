const express = require('express');
const router = express.Router();

router.get('/strings', (req, res) => {
    const s1 = 'Я люблю Беларусь';
    const s2 = 'Я учусь в Политехническом колледже';

    // Определение длины строки
    const stringLength = `<p>Длина строки S2: ${s2.length}</p>`;
    // Вывод n-ого символа и его ASCII-кода
    const symbol = `<p>22-ой символ в строке S1: ${s1.charAt(11)}; ASCII-код: ${s1.charCodeAt(11)}</p>`;
    // Замена в строке S1 слова Беларусь на слово Гродно
    const s2Replaced = `<p>Изменённая строка S1: ${s1.replace('Беларусь', 'Гродно')}</p>`;

    res.send(`
    <html lang="ru">
      <head>
        <title>Студенты и стипендии</title>
      </head>
      <body>
        ${stringLength}
        ${symbol}
        ${s2Replaced}
      </body>
    </html>
  `);
});

module.exports = router;