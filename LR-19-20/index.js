const itemsCrystals = [
    {
        name: "Кристаллы сотворения х60",
        price: 1.19,
        pathToImg: "./img/c60.png"
    },
    {
        name: "Кристаллы сотворения х300",
        price: 5.99,
        pathToImg: "./img/c300.png"
    },
    {
        name: "Кристаллы сотворения x980",
        price: 17.99,
        pathToImg: "./img/c980.png"
    },
    {
        name: "Кристаллы сотворения x1980",
        price: 35.99,
        pathToImg: "./img/c1980.png"
    },
    {
        name: "Кристаллы сотворения x3280",
        price: 59.99,
        pathToImg: "./img/c3280.png"
    }
]

const itemsOther = [
    {
        name: "Боевой пропуск",
        price: 19.99,
        pathToImg: "./img/i1.png"
    },
    {
        name: "Благословение полой луны",
        price: 5.99,
        pathToImg: "./img/i2.png"
    },
    {
        name: "Меч Сокола",
        price: 179.99,
        pathToImg: "./img/i3.webp"
    },
    {
        name: "Лук Амоса",
        price: 999,
        pathToImg: "./img/i4.webp"
    },
    {
        name: "Нефритовый коршун",
        price: 2999,
        pathToImg: "./img/i5.webp"
    }
]

const cartItems = [];

window.addEventListener('load', () => {
    const storedCartItems = localStorage.getItem('cartItems');

    if (storedCartItems !== null) {
        cartItems.push(...JSON.parse(storedCartItems));
    }

    renderCart();
});

const openCartButton = document.getElementById('open-cart-btn');
const closeCartButton = document.getElementById('close-cart-btn');
function toggleFormModal() {
    const formModal = document.getElementById('form-modal');
    if(formModal.style.display === 'block') {
        formModal.style.display = 'none'
    } else {
        renderDataFromStorages();
        formModal.style.display = 'block'
    }
}
function renderDataFromStorages() {
    const cookieData = [getCookie('fullName') || '', getCookie('email') || '', getCookie('dob') || '', getCookie('birthPlace') || '', getCookie('hobbies') || ''];
    const localstorageData = [localStorage.getItem('fullName') || '', localStorage.getItem('email') || '', localStorage.getItem('dob') || '', localStorage.getItem('birthPlace') || '', localStorage.getItem('hobbies') || ''];
    const cookieContainer = document.getElementById('from-cookies');
    const localStorageContainer = document.getElementById('from-localstorage');
    cookieContainer.innerHTML = 'Из Cookies:'
    localStorageContainer.innerHTML = 'Из Localstorage: ';
    for(let i = 0; i < 5; i++) {
        const cookieParagraph = document.createElement('p');
        cookieParagraph.append(cookieData[i]);
        cookieContainer.append(cookieParagraph);
        const localstorageParagraph = document.createElement('p');
        localstorageParagraph.append(localstorageData[i]);
        localStorageContainer.append(localstorageParagraph);
    }
}
function toggleCartModal() {
    const cartModal = document.getElementById('cart-modal');
    if(cartModal.style.display === 'block') {
        cartModal.style.display = 'none'
    } else {
        cartModal.style.display = 'block'
        renderCart()
    }
}
function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';
    let totalCost = 0;
    cartItems.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.classList.add('product');

        const itemImage = document.createElement('img');
        itemImage.src = item.pathToImg;
        itemImage.alt = item.name;

        const itemName = document.createElement('p');
        itemName.textContent = item.name;
        const itemPrice = document.createElement('p');
        itemPrice.textContent = `Цена: ${item.price}$`;

        totalCost += item.price;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.addEventListener('click', () => {
            removeFromCart(index);
        });

        cartItemDiv.appendChild(itemImage);
        cartItemDiv.appendChild(itemName);
        cartItemDiv.appendChild(itemPrice);
        cartItemDiv.appendChild(removeButton);

        cartContainer.appendChild(cartItemDiv);
    });

    const totalCostElement = document.getElementById('total-cost');
    totalCostElement.textContent = `Общая сумма: ${totalCost.toFixed(2)}$`;
}
function removeFromCart(index) {
    cartItems.splice(index, 1);
    saveCartToLocalStorage();
    renderCart();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

openCartButton.addEventListener('click', toggleCartModal);
closeCartButton.addEventListener('click', toggleCartModal);

const genesisContainer = document.getElementById('genesis');
const itemsContainer = document.getElementById('other');

const generateItemCard = (item, container) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    const productName = document.createElement('p');
    const productPrice = document.createElement('p');
    const productImage = document.createElement('img');
    const addToCartButton = document.createElement('button');
    const addToCartDiv = document.createElement('div');

    productName.textContent = item.name;
    productPrice.textContent = `Цена: ${item.price}$`;
    productImage.src = item.pathToImg;
    addToCartButton.textContent = 'Добавить в корзину';

    addToCartButton.addEventListener('click', () => {
        cartItems.push(item);
        saveCartToLocalStorage();
    });

    productDiv.appendChild(productName);
    productDiv.appendChild(productImage);
    addToCartDiv.appendChild(productPrice);
    addToCartDiv.appendChild(addToCartButton);
    productDiv.appendChild(addToCartDiv);

    container.appendChild(productDiv)
}

itemsOther.forEach(item => {
    generateItemCard(item, itemsContainer)
});

itemsCrystals.forEach(item => {
    generateItemCard(item, genesisContainer)
});


function submitForm() {
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var dob = document.getElementById('dob').value;
    var birthPlace = document.getElementById('birthPlace').value;
    var hobbies = document.getElementById('hobbies').value;

    setCookie('fullName', fullName, 365);
    setCookie('email', email, 365);
    setCookie('dob', dob, 365);
    setCookie('birthPlace', birthPlace, 365);
    setCookie('hobbies', hobbies, 365);

    localStorage.setItem('fullName', fullName)
    localStorage.setItem('email', email)
    localStorage.setItem('dob', dob)
    localStorage.setItem('birthPlace', birthPlace)
    localStorage.setItem('hobbies', hobbies)

    renderDataFromStorages();
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, "", -1);
}

function clearData() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        deleteCookie(name)
    }

    localStorage.removeItem('fullName')
    localStorage.removeItem('email')
    localStorage.removeItem('dob')
    localStorage.removeItem('birthPlace')
    localStorage.removeItem('hobbies')

    renderDataFromStorages();
}
