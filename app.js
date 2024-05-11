document.addEventListener("DOMContentLoaded", function() {
    const tg = window.Telegram.WebApp;

    // Устанавливаем основные настройки кнопки
    tg.MainButton.show();
    tg.MainButton.enable();

    // Аутентификация пользователя через данные Telegram
    const user = tg.initDataUnsafe.user;
    console.log(`Здравствуйте, ${user.first_name} ${user.last_name}!`);

    // Подписываемся на события кнопки
    tg.MainButton.onClick(() => {
        if (tg.MainButton.text === 'Отправить данные') {
            sendData();
        }
    });

    // Инициализируем элементы UI и обработчики
    initializeTaskManager();
});

function initializeTaskManager() {
    document.getElementById('task-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const desc = document.getElementById('task-desc').value;
        const date = document.getElementById('task-date').value;
        const time = document.getElementById('task-time').value;

        const task = { description: desc, date, time, completed: false };
        saveTask(task);
        displayTasks();
    });
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    Telegram.WebApp.sendData(JSON.stringify(task)); // Отправка данных в бота
}

function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = `<li>
            ${task.description}, до ${task.date} ${task.time}
            <button onclick="completeTask(${task.description})">Завершить</button>
        </li>`;
        taskList.innerHTML += taskItem;
    });
}

function completeTask(description) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = tasks.map(task => {
        if (task.description === description) {
            task.completed = true;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    displayTasks();
    Telegram.WebApp.sendData(JSON.stringify({description, completed: true})); // Отправка обновленных данных
}






