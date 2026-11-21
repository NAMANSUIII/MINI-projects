
let tasks = JSON.parse(localStorage.getItem("kanbanTasks")) || [];

let editingTaskId = null;

const columns = ["todo", "progress", "review", "completed"];

function saveData() {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
}

function renderTasks() {
    columns.forEach(id => {
        document.getElementById(id).innerHTML = "";
    });

    const search = document.getElementById("searchInput")
        .value.toLowerCase();

    tasks.filter(task =>
        task.title.toLowerCase().includes(search)
    ).forEach(task => {

        const card = document.createElement("div");
        card.className = "task";
        card.draggable = true;
        card.dataset.id = task.id;

        const title = document.createElement("h3");
        title.textContent = task.title;

        const description = document.createElement("p");
        description.textContent = task.description;

        const priority = document.createElement("span");
        priority.className = "priority " + task.priority;
        priority.textContent = task.priority + " Priority";

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => editTask(task.id));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));

        actions.append(editBtn, deleteBtn);
        card.append(title, description, priority, actions);

        document.getElementById(task.status).appendChild(card);

        card.addEventListener("dragstart", () => {
            card.classList.add("dragging");
        });

        card.addEventListener("dragend", () => {
            card.classList.remove("dragging");
        });
    });

    updateDashboard();
}

function updateDashboard() {
    document.getElementById("totalTasks").textContent = tasks.length;

    document.getElementById("todoTasks").textContent =
        tasks.filter(t => t.status === "todo").length;

    document.getElementById("progressTasks").textContent =
        tasks.filter(t => t.status === "progress").length;

    document.getElementById("completedTasks").textContent =
        tasks.filter(t => t.status === "completed").length;
}

function openTaskForm() {
    editingTaskId = null;

    document.getElementById("modalTitle").textContent =
        "Add New Task";

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskPriority").value = "Medium";
    document.getElementById("taskStatus").value = "todo";

    document.getElementById("taskModal").style.display = "flex";
}

function closeTaskForm() {
    document.getElementById("taskModal").style.display = "none";
}

function saveTask() {
    const title = document.getElementById("taskTitle").value.trim();
    const description = document.getElementById("taskDescription").value;
    const priority = document.getElementById("taskPriority").value;
    const status = document.getElementById("taskStatus").value;

    if (!title) {
        alert("Please enter a task title.");
        return;
    }

    if (editingTaskId !== null) {
        const task = tasks.find(t => t.id === editingTaskId);

        Object.assign(task, {
            title, description, priority, status
        });

    } else {
        tasks.push({
            id: Date.now(),
            title,
            description,
            priority,
            status
        });
    }

    saveData();
    renderTasks();
    closeTaskForm();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);

    editingTaskId = id;

    document.getElementById("modalTitle").textContent =
        "Edit Task";

    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("taskPriority").value = task.priority;
    document.getElementById("taskStatus").value = task.status;

    document.getElementById("taskModal").style.display = "flex";
}

function deleteTask(id) {
    if (!confirm("Delete this task?")) return;

    tasks = tasks.filter(t => t.id !== id);

    saveData();
    renderTasks();
}

// Drag and drop functionality

document.querySelectorAll(".column").forEach(column => {

    column.addEventListener("dragover", event => {
        event.preventDefault();
    });

    column.addEventListener("drop", event => {
        event.preventDefault();

        const dragged = document.querySelector(".dragging");
        if (!dragged) return;

        const id = Number(dragged.dataset.id);
        const task = tasks.find(t => t.id === id);

        if (!task) return;

        task.status = column.dataset.status;

        saveData();
        renderTasks();
    });
});

// Search functionality

document.getElementById("searchInput")
    .addEventListener("input", renderTasks);

// Initial loading

renderTasks();
