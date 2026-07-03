function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;

    li.querySelector("span").addEventListener("click", function () {
        this.classList.toggle("completed");
    });

    li.querySelector(".delete-btn").addEventListener("click", function () {
        li.remove();
    });

    document.getElementById("taskList").appendChild(li);

    taskInput.value = "";
}