let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* =========================
   SAVE TO LOCAL STORAGE
========================= */
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* =========================
   ADD TASK
========================= */
function addTask() {

    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    const message = document.getElementById("message");

    if (!text) return;

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    displayTasks();

    input.value = "";
    input.focus();

    // SHOW SUCCESS MESSAGE
    message.innerText = "Task added successfully!";
    message.classList.add("show");

    // hide after 2 seconds
    setTimeout(() => {
        message.classList.remove("show");
    }, 2000);
}
/* =========================
   DISPLAY TASKS
========================= */
function displayTasks() {

    const taskList = document.getElementById("taskList");
    if (!taskList) return;

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-left">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${index})">

                <span class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>

            </div>

            <i
                class="fa-solid fa-trash delete-btn"
                onclick="deleteTask(${index})">
            </i>
        `;

        taskList.appendChild(li);
    });
    updateStats(); 
}

/* =========================
   mark all done
========================= */
function markAllDone() {

    tasks = tasks.map(task => ({
        ...task,
        completed: true
    }));

    saveTasks();
    displayTasks();
}

/* =========================
   DELETE ALL TASKS
========================= */
function deleteAllTasks() {

    if(tasks.length === 0) return;

    tasks = [];

    saveTasks();
    displayTasks();
}
/* =========================
   TOGGLE COMPLETE
========================= */
function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    displayTasks();
}

/* =========================
   DELETE TASK
========================= */
function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}

/* =========================
   stats update
========================= */
function updateStats() {

    const activeCount = tasks.filter(t => !t.completed).length;
    const doneCount = tasks.filter(t => t.completed).length;

    const activeEl = document.getElementById("activeCount");
    const doneEl = document.getElementById("doneCount");

    if (activeEl) activeEl.innerText = "Active: " + activeCount;
    if (doneEl) doneEl.innerText = "Completed: " + doneCount;
}
/* =========================
   INITIAL LOAD
========================= */
displayTasks();