const calendarTable = document.getElementById('calendarTable');
const monthYearDisplay = document.getElementById('monthYear');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const removeTaskBtn = document.getElementById('removeTaskBtn');

let currentDate = new Date();
let tasks = {}; 
let selectedCell = null;
let selectedTaskId = null; 

document.addEventListener("DOMContentLoaded", loadAllTasks); 

// Function to load tasks from the backend
function loadAllTasks() {
    fetch('http://localhost:3000/web/calendar', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        tasks = data.calendarTasks.reduce((acc, task) => {
            const dateKey = task.date;
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(task);
            return acc;
        }, {});
        console.log('Loaded tasks:', tasks); 
        updateCalendar();
    })
    .catch(error => console.error('Error fetching tasks:', error));
}

// Function to update the calendar
function updateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    monthYearDisplay.textContent = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    calendarTable.querySelector('tbody').innerHTML = '';

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                cell.innerHTML = '';
            } else if (date > daysInMonth) {
                cell.innerHTML = '';
            } else {
                const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                cell.textContent = date;
                const dayTasks = tasks[dateKey] || [];
                
                const taskList = document.createElement('ul');
                taskList.classList.add('task-list');
                dayTasks.forEach(task => {
                    const taskItem = document.createElement('li');
                    taskItem.textContent = task.title;
                    taskItem.dataset.taskId = task.id; 

                    taskItem.addEventListener('click', (e) => {
                        e.stopPropagation(); 
                        selectedTaskId = task.id; 
                        const taskItems = taskList.querySelectorAll('li');
                        taskItems.forEach(item => item.classList.remove('selected')); 
                        taskItem.classList.add('selected'); 
                    });

                    taskList.appendChild(taskItem);
                });

                cell.appendChild(taskList);
                cell.addEventListener('click', () => {
                    if (selectedCell) selectedCell.classList.remove('today');
                    selectedCell = cell;
                    selectedCell.classList.add('today');
                    selectedTaskId = null; 
                });

                date++;
            }
            row.appendChild(cell);
        }
        calendarTable.querySelector('tbody').appendChild(row);
    }
}

// Function to add a new task
function addTask(selectedDate) {
    const taskTitle = taskInput.value.trim();
    if (!taskTitle) {
        alert('Task name cannot be empty.');
        return;
    }

    const newTask = { 
        title: taskTitle,   
        date: selectedDate 
    };

    fetch('http://localhost:3000/web/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
    })
    .then(createdTask => {
        const dateKey = createdTask.calendarTask.date; 
        tasks[dateKey] = tasks[dateKey] || [];
        tasks[dateKey].push(createdTask.calendarTask); 
        taskInput.value = '';
        updateCalendar();
    })
    .catch(error => console.error('Error creating task:', error));
}

// Function to delete a specific task
function removeTask(selectedDate) {
    const dayTasks = tasks[selectedDate];

    if (dayTasks && dayTasks.length > 0) {
        const taskToDelete = dayTasks[dayTasks.length - 1]; 
        const taskId = taskToDelete.id; 

        fetch(`http://localhost:3000/web/calendar/${taskId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting task from server.');
            }
            tasks[selectedDate].pop(); 
            if (tasks[selectedDate].length === 0) {
                delete tasks[selectedDate]; 
            }

            updateCalendar(); 
        })
        .catch(error => console.error('Error deleting task:', error));
    } else {
        alert('There are no tasks in this cell, nothing to delete.'); 
    }
}

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

// Adding a task
addTaskBtn.addEventListener('click', () => {
    if (selectedCell) {
        const selectedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(selectedCell.textContent).padStart(2, '0')}`;
        addTask(selectedDate);
    } else {
        alert("Please select a date before adding a task.");
    }
});

// Deleting a task
removeTaskBtn.addEventListener('click', function () {
    if (selectedCell) {
        const day = selectedCell.querySelector('ul') ? selectedCell.firstChild.textContent.trim() : selectedCell.textContent.trim();
        const selectedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        removeTask(selectedDate);
    } else {
        alert('You must select a cell before deleting a task.'); 
    }
});

updateCalendar();

