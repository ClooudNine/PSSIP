const express = require('express');
const router = express.Router();

router.get('/students', (req, res) => {
    const students = {'Иванов': 200, 'Петров': 340, 'Сидоров': 800};

    // Массив тегов p со значениями и ключами
    const studentsOutput = Object.entries(students).map(student => `<p>${student[0]} - ${student[1]}</p>`);

    // Подсчёт суммарной величины начисленной стипендии
    const totalScholarship = Object.values(students).reduce((acc, scholarship) => acc + scholarship, 0);
    const totalScholarshipOutput = `<p>Суммарная величина начисленной стипендии: ${totalScholarship}</p>`;

    res.send(`
    <html lang="ru">
      <head>
        <title>Студенты и стипендии</title>
      </head>
      <body>
        ${studentsOutput.join(' ')}
        ${totalScholarshipOutput}
      </body>
    </html>
  `);
});

module.exports = router;