function writeData() {
    var emailInput = document.getElementById('email');
    var emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    if (!emailPattern.test(emailInput.value)) {
        alert("Некорректный формат E-Mail!");
    } else {
        const data = new FormData(customForm);
        let result = "Ввод исходных данных:\n";
        let jsonFormat = {};
        data.forEach(function(value, key){
            jsonFormat[key] = value;
            result += key + ': ' + value + '\n';
            document.cookie = key + '=' + encodeURIComponent(value) + '; expires=' + new Date(new Date().getTime() + 86400 * 1000).toUTCString();
        });
        localStorage.setItem("formData", JSON.stringify(jsonFormat));
        displayCookies();
        alert(result);
    }
}

function displayCookies() {
    var cookies = document.cookie.split('; ');
    var outputDiv = document.getElementById('cookieOutput');
    outputDiv.innerHTML = "<strong>Значения cookie:</strong><br>";
    if(cookies[0] === "") {
        outputDiv.innerHTML += "Cookies отсутствуют!"
    } else {
        cookies.forEach(function (cookie) {
            var parts = cookie.split('=');
            var name = parts[0];
            var value = decodeURIComponent(parts[1]);
            outputDiv.innerHTML += "<p><strong>" + name + ":</strong> " + value + "</p>";
        });
    }
}

function clearData() {
    document.getElementById('customForm').reset();
    var cookies = document.cookie.split('; ');
    cookies.forEach(function(cookie) {
        var parts = cookie.split('=');
        var name = parts[0];
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    });
    localStorage.removeItem("formData");
    displayCookies();
}

window.onload = displayCookies;