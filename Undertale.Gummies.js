// Переменные прогресса игрока
let currentLvl = 1;
let currentExp = 0;
const maxLvl = 20;

// Управление всплывающими окнами
function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Логика кнопки Входа
function submitLogin() {
    let name = document.getElementById('loginName').value;
    if(name.trim() !== "") {
        document.getElementById('userName').innerText = name;
        alert("Файл сохранения игрока " + name + " успешно загружен!");
        closeModal('loginModal');
    } else {
        alert("Введите имя персонажа!");
    }
}

// Логика кнопки Регистрации
function submitRegister() {
    let name = document.getElementById('regName').value;
    if(name.trim() !== "") {
        document.getElementById('userName').innerText = name;
        currentLvl = 1;
        currentExp = 0;
        updateLvlUI();
        alert("Добро пожаловать в Подземелье, " + name + "! Ваша история начинается.");
        closeModal('regModal');
    } else {
        alert("Имя не может быть пустым!");
    }
}

// Система покупки желеек и начисления опыта
function buyJelly(itemName, expGained) {
    alert("Вы приобрели " + itemName + "! Получено +" + expGained + " EXP.");
    
    if (currentLvl < maxLvl) {
        currentExp += expGained;
        
        // Каждые 100 EXP повышают УР
        if (currentExp >= 100) {
            currentLvl += Math.floor(currentExp / 100);
            currentExp = currentExp % 100;
            
            if (currentLvl >= maxLvl) {
                currentLvl = maxLvl;
                currentExp = 0;
                alert("❤️ ПОЗДРАВЛЯЕМ! Вы достигли максимального УР 20 и максимальной скидки!");
            } else {
                alert("⚔️ Ваша ЖЕЛАНИЕ КУПИТЬ повысило ваш УР! Текущий УР: " + currentLvl);
            }
        }
        updateLvlUI();
    } else {
        alert("У вас уже максимальный 20 УР!");
    }
}

// Обновление интерфейса шкалы и скидок
function updateLvlUI() {
    document.getElementById('userLvl').innerText = currentLvl;
    
    // Рассчитываем длину полоски EXP в процентах
    let percent = currentLvl === maxLvl ? 100 : currentExp;
    document.getElementById('lvlBar').style.width = percent + '%';
    
    // Рассчитываем скидку (базовая 5% + по 1% за каждый новый уровень)
    let discount = 5 + (currentLvl - 1);
    if (discount > 25) discount = 25; // Ограничение скидки в 25%
    
    document.getElementById('discountValue').innerText = discount + '%';
}

// Участие в розыгрыше мерча
function joinGiveaway(itemName) {
    alert("Вы успешно записались на розыгрыш предмета: " + itemName + "! Результаты будут проверены в вашем файле сохранения.");
}
