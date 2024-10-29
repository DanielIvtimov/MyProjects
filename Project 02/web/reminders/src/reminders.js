const remindersList = document.getElementById('remindersList');
const addReminderBtn = document.getElementById('addReminderBtn');
const reminderTitle = document.getElementById('reminderTitle');
const reminderDateTime = document.getElementById('reminderDateTime');
const reminderDescription = document.getElementById('reminderDescription');

// Load reminders from the backend
let reminders = [];

// Function to render reminders
function renderReminders() {
    remindersList.innerHTML = '';
    reminders.forEach((reminder, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'reminder-item';

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'reminder-details';

        const title = document.createElement('h4');
        title.textContent = reminder.title;
        detailsDiv.appendChild(title);

        const dateTime = document.createElement('p');
        dateTime.textContent = new Date(reminder.dateTime).toLocaleString();
        detailsDiv.appendChild(dateTime);

        if (reminder.description) {
            const description = document.createElement('p');
            description.textContent = reminder.description;
            detailsDiv.appendChild(description);
        }

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'reminder-actions';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteReminder(reminder.id);
        actionsDiv.appendChild(deleteBtn);

        listItem.appendChild(detailsDiv);
        listItem.appendChild(actionsDiv);

        remindersList.appendChild(listItem);
    });
}

// Function to load reminders from the backend
function loadReminders() {
    fetch('http://localhost:3000/web/reminders', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        reminders = data.reminders; 
        renderReminders();
    })
    .catch(error => console.error('Error fetching reminders:', error));
}

// Function to add a new reminder
function addReminder() {
    const title = reminderTitle.value.trim();
    const dateTime = reminderDateTime.value;
    const description = reminderDescription.value.trim();

    if (title && dateTime) {
        const newReminder = { title, dateTime, description };

        fetch('http://localhost:3000/web/reminders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReminder),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error adding reminder.');
            }
            return response.json();
        })
        .then(createdReminder => {
            console.log(createdReminder); 
            if (createdReminder.savedReminder) { 
                reminders.push(createdReminder.savedReminder); 
                renderReminders(); 
            } else {
                throw new Error('Created reminder is undefined.');
            }
            reminderTitle.value = '';
            reminderDateTime.value = '';
            reminderDescription.value = '';
        })
        .catch(error => console.error('Error creating reminder:', error));
    } else {
        alert('Please fill in both the title and the date/time.');
    }
}

// Function to update a reminder
function updateReminder(id) {
    const title = reminderTitle.value.trim();
    const dateTime = reminderDateTime.value;
    const description = reminderDescription.value.trim();

    if (title && dateTime) {
        const updatedReminder = { title, dateTime, description };

        fetch(`http://localhost:3000/web/reminders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedReminder),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error updating reminder.');
            }
            return response.json();
        })
        .then(() => {
            const index = reminders.findIndex(r => r.id === id);
            reminders[index] = updatedReminder; 
            renderReminders();
            reminderTitle.value = '';
            reminderDateTime.value = '';
            reminderDescription.value = '';
            addReminderBtn.textContent = 'Add Reminder';
            addReminderBtn.onclick = addReminder;
        })
        .catch(error => console.error('Error updating reminder:', error));
    } else {
        alert('Please fill in both the title and the date/time.');
    }
}

// Function to delete a reminder
function deleteReminder(id) {
    if (confirm('Are you sure you want to delete this reminder?')) {
        fetch(`http://localhost:3000/web/reminders/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting reminder.');
            }
            reminders = reminders.filter(reminder => reminder.id !== id); 
            renderReminders();
        })
        .catch(error => console.error('Error deleting reminder:', error));
    }
}

// Event listener for adding a reminder
addReminderBtn.addEventListener('click', addReminder);

// Load reminders on initial render
loadReminders();
