document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const desc = document.getElementById('task-desc').value;
    const date = document.getElementById('task-date').value;
    const time = document.getElementById('task-time').value;
    const taskId = Date.now();

    const task = { id: taskId, description: desc, date, time, completed: false };
    saveTask(task);
    displayTasks();
});

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasks(filter = 'all') {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        return filter === 'completed' ? task.completed : !task.completed;
    });

    filteredTasks.forEach(task => {
        const taskItem = `<li class="${task.completed ? 'completed' : ''}">
            ${task.description}, до ${task.date} ${task.time}
            <button onclick="completeTask(${task.id})">Завершить</button>
            <button onclick="deleteTask(${task.id})">Удалить</button>
        </li>`;
        taskList.innerHTML += taskItem;
    });
}

function completeTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = true;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    displayTasks();
}

function deleteTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    displayTasks();
}

function filterTasks(filter) {
    displayTasks(filter);
}

window.onload = displayTasks;






