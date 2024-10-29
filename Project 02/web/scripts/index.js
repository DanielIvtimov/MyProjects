let currentTaskElapsedTime = 0;
let topDivActiveTask = document.getElementById('topDivActiveTask');
let timer = document.getElementById('timer');
let addTaskButton = document.getElementById('addTaskButton');
let startStopButton = document.getElementById('startStopButton');
let topContent = document.getElementById('topContent');
let taskNameBox = document.getElementById('taskName');
let taskTimeBox = document.getElementById('taskTime');
let taskBox = document.getElementById('taskBox');
let currentActiveTaskId = -1;
let timeInterval;
let currentTimeInSeconds = 1500;

showTasks();

// 1. Create Task
addTaskButton.addEventListener('click', function () {
    let tasks = [];

    // Mini Validation
    // 1. Task Limit 
    if (tasks.length >= 5){
        addTaskButton.disabled = true;
        alert('You can only add up to 5 tasks.');
        return;
    }

    // 2. Input no value
    let taskName = taskNameBox.value.trim();
    if (taskName === "") {
        alert('Task name should not be empty.');
        return;
    }

    // 3. Pomodoros Input no value
    let pomodorosInput = taskTimeBox.value.trim();
    if (pomodorosInput === "") {
        alert('Pomodoros time should not be empty.');
        return;
    }
    // 4. No text for value
    if (!/^\d*\.?\d*$/.test(pomodorosInput)) {
        alert('Pomodoros time should only contain numbers.');
        return;
    }

    // 5. No negative numbers for value
    let pomodoros = parseFloat(pomodorosInput);
    if (pomodoros <= 0) {
        alert('Pomodoros time should be a positive number.');
        return;
    }

    let category = prompt("Please enter a category (e.g., work, job, bonus, homework):");
    if(!category){
        alert('Category should not be empty. Defaulting to "work".');
        category = "work";
    }

    let taskTimeInMinutes = (pomodoros * 25).toFixed(2);
    let taskObject = {
        'name': taskNameBox.value.trim(),
        'time': parseInt(taskTimeInMinutes, 10),
        'remainingTime': parseInt(taskTimeInMinutes * 60, 10),
        'elapsedTime': 0,
        'totalPomodoros': parseInt(pomodoros, 10),
        'remainingPomodoros': 0,
        'completionTime': undefined,
        'status': "deferred",
        'category': category
    };

    fetch('http://localhost:3000/web/home', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskObject)
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        tasks = data;
        console.log('Task created', data);
        showTasks();
    })
    .catch(error => {
        console.error('There was a problem with fetch operation:', error)
    });

    taskTimeBox.value = "";
    taskNameBox.value = "";
})

// 2. Showing all created tasks
function showTasks() {
    fetch('http://localhost:3000/web/home', {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();  
    })
    .then(data => { 
        console.log('Fetched tasks:', data.tasks); 
        taskBox.innerHTML = ''; 
        if (data.tasks.length > 0) { 
            data.tasks.forEach((task) => { 
                let importantCheckbox = task.important ? 'checked' : ''; 
                taskBox.innerHTML += `
                    <div id="${task.id}" class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${task.name}</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${task.time} min</li>
                        </ul>
                        <div class="center">
                            <button type="button" class="btn btn-secondary btn-sm set_timer">Set Timer</button>
                            <button type="button" class="removeButton btn btn-secondary btn-sm">Remove</button>
                            <input type="checkbox" class="importantCheckbox" data-taskid="${task.id}" ${importantCheckbox}>
                            <label for="importantCheckbox">Mark as Important</label>
                        </div>
                    </div><br/> 
                `;
            });
        }

        if (data.tasks.length >= 5) { 
            addTaskButton.disabled = true;
        } else {
            addTaskButton.disabled = false;
        }
    })
    .catch(error => {
        console.error('There was a problem with fetch operation:', error);
    });
}

// 3. Remove Task 
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('removeButton')) {
        const taskId = event.target.parentNode.parentNode.id;
        if (confirm('Are you sure that you want to remove the task?')) {
            fetch(`http://localhost:3000/web/home/${taskId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Task deleted:', data);
                showTasks(); 
                if (data.remainingTasks < 5) {
                    addTaskButton.disabled = false;
                }
            })
            .catch(error => {
                console.error('There was a problem with fetch operation:', error);
            });
        }
    }
});

// 4. Set Timer 
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('set_timer')) {
        fetch('http://localhost:3000/web/home', {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            let tasks = data.tasks; 
            let activeTaskId = parseInt(event.target.parentNode.parentNode.id);
            if (!isNaN(activeTaskId)) {
                let activeTask = tasks.find(task => task.id === activeTaskId);
                if (activeTask) {
                    topDivActiveTask.style.display = 'block';
                    topDivActiveTask.innerHTML = activeTask.name;
                    currentActiveTaskId = activeTask.id;
                    activeTask.remainingTime = currentTimeInSeconds; 
                    activeTask.status = "in progress";

                    fetch(`http://localhost:3000/web/home/${activeTaskId}`, { 
                        method: 'PUT', 
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            remainingTime: activeTask.remainingTime,
                            status: activeTask.status
                        })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Failed to update task status");
                        }
                        return response.json(); 
                    })
                    .then(updatedTask => {
                        console.log('Task status updated:', updatedTask); 
                    })
                    .catch(error => {
                        console.error('Error updating task:', error);
                    });
                }
            }
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
    }
});

// 5. Start/Pause Timer
startStopButton.addEventListener('click', function(event){
    if (event.target.innerText === 'Start'){
        localStorage.getItem("tasks")
        event.target.innerText = 'Pause';
        timerInterval = setInterval(trackAndUpdateTimer, 1000);
        if(currentActiveTaskId === -1){
            topDivActiveTask.style.display = 'none';
        }
    }else if(event.target.innerText === 'Pause'){
        event.target.innerText = 'Start';
        clearInterval(timerInterval);
        if(currentActiveTaskId === -1){
            topDivActiveTask.style.display = 'block';
        }
    }
});

// 6. Short Break
let isBreak = false;
function startShortBreak(){
    alert("It's time for a break.");
    document.body.style.backgroundColor = "#38858A";
    document.body.style.transition = "background-color 2.0s ease"
    currentTimeInSeconds = 300; 
    timer.innerHTML = "00:05"; 
    isBreak = true; 
    startStopButton.innerText = 'Start'; 

    const taskCards = document.querySelectorAll('.card'); 
    taskCards.forEach(card => {
        card.style.backgroundColor = "#073b3f"; 
        card.style.color = "#fff"; 
        card.style.transition = "background-color 2.0s ease"
    });

    topContent.style.backgroundColor = "#073b3f"; 
    topContent.style.transition = "background-color 2.0s ease"
}


function trackAndUpdateTimer() {
    let currentTime = timer.innerHTML;
    let [minutes, seconds] = currentTime.split(':').map(part => parseInt(part, 10));

    if (isBreak) {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timerInterval);
            alert("The break is over, it's time to get back to work.");
            document.body.style.backgroundColor = ""; 
            const taskCards = document.querySelectorAll('.card'); 
            taskCards.forEach(card => {
                card.style.backgroundColor = "#d43d3d"; 
            });

            topContent.style.backgroundColor = ""; 
            currentTimeInSeconds = 900; 
            timer.innerHTML = "00:15"; 
            isBreak = false; 
            startStopButton.innerText = 'Start'; 
            return;
        }
    } else {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timerInterval);
            fetch('http://localhost:3000/web/home')
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    let tasks = data.tasks || [];
                    let activeTask = tasks.find((task) => task.id === currentActiveTaskId);
                    if (activeTask) {
                        activeTask.status = "completed";
                        activeTask.completionTime = new Date().toISOString();
                        
                        const date = new Date();
                        const day = String(date.getDate()).padStart(2, '0'); 
                        const month = String(date.getMonth() + 1).padStart(2, '0'); 
                        const year = date.getFullYear();
                        const hours = String(date.getHours()).padStart(2, '0');
                        const minutesCompleted = String(date.getMinutes()).padStart(2, '0');
                        activeTask.completionTime = `${day}.${month}.${year} : ${hours}:${minutesCompleted}`;
                        
                        fetch(`http://localhost:3000/web/home/${activeTask.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(activeTask)
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error("Failed to update task");
                            }
                        })
                        .catch(error => {
                            console.error('Error updating task:', error);
                        });
                    }
                    startShortBreak(); 
                })
                .catch(error => {
                    console.error('Error fetching tasks:', error);
                });
            return;
        }
    }
    
    seconds--;
    if (seconds < 0) {
        seconds = 59;
        minutes--;
    }
    currentTimeInSeconds = minutes * 60 + seconds;
    timer.innerHTML = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}