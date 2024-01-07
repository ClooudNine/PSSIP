function math(a, b, c) {
    return ((Math.pow(b, 2) - Math.PI) / (Math.abs(a - 4))) + 7 * Math.sqrt(c + Math.PI);
}

function output(a, b, c) {
    document.body.append(math(a, b, c));
}

const s1 = new String("Я - будущий программист");
const s2 = new String("У меня всё получится");
alert("Длина строки s2 = " + s2.length);
alert("Вариант 22: " + s1.charAt(22));
alert("ASCII-код этого символа: " + s1.charCodeAt(22));
alert("Замена всех 'у' на '!' в S1: " + s1.replaceAll(/у/g, "!"));