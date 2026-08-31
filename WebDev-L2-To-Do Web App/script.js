const notask = document.querySelector(".notask");
const tasksContent = document.querySelector(".tasksContent");
const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const clearButton = document.getElementById("clearButton");

const allTasks = document.getElementById("allTasks");

const allTasksLink = document.getElementById("allTasksLink");
const completedTasksLink = document.getElementById("completedTasksLink");
const pendingTasksLink = document.getElementById("pendingTasksLink");

let savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];

// ADD TASK
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = {
        taskname: taskText,
        completed: false,
        date: new Date().toLocaleDateString()
    };

    savedTasks.push(newTask);

    localStorage.setItem(
        "savedTasks",
        JSON.stringify(savedTasks)
    );

    taskInput.value = "";

    clearButton.style.display = "flex";
    displayTask("all");
}

// DISPLAY TASKS
function displayTask(filter = "all") {

    allTasks.innerHTML = "";

    if (savedTasks.length === 0) {

        notask.style.display = "flex";
        tasksContent.style.display = "none";

        return;
    }

    notask.style.display = "none";
    tasksContent.style.display = "flex";


    for (const [index, task] of savedTasks.entries()) {

        // FILTER
        if (filter === "completed" && !task.completed) {
            continue;
        }

        if (filter === "pending" && task.completed) {
            continue;
        }


        const taskDiv = document.createElement("div");

        taskDiv.classList.add("task1");

        taskDiv.innerHTML = `
            
            <label>
                ${task.taskname}

                <input
                    type="checkbox"
                    class="checkbox"
                    data-index="${index}"
                    ${task.completed ? "checked" : ""}
                >
            </label>

            <p>${task.date}</p>

            <div class="editRemove">

                <i
                    class="fa-solid fa-pencil edit"
                    data-index="${index}">
                </i>

                <i
                    class="fa-solid fa-trash-can delete"
                    data-index="${index}">
                </i>

            </div>
        `;

        allTasks.appendChild(taskDiv);
    }
}

// CHECKBOX
allTasks.addEventListener("change", function (e) {

    if (e.target.classList.contains("checkbox")) {

        const index = e.target.dataset.index;

        savedTasks[index].completed = e.target.checked;

        localStorage.setItem(
            "savedTasks",
            JSON.stringify(savedTasks)
        );

        displayTask("all");
    }
});

// DELETE
allTasks.addEventListener("click", function (e) {

    if (e.target.classList.contains("delete")) {

        const index = e.target.dataset.index;

        savedTasks.splice(index, 1);

        localStorage.setItem(
            "savedTasks",
            JSON.stringify(savedTasks)
        );

        displayTask("all");
    }
});

// EDIT
allTasks.addEventListener("click", function (e) {

    if (e.target.classList.contains("edit")) {

        const index = e.target.dataset.index;

        const newText = prompt(
            "Edit task:",
            savedTasks[index].taskname
        );

        if (newText === null || newText.trim() === "") {
            return;
        }

        savedTasks[index].taskname = newText.trim();

        localStorage.setItem(
            "savedTasks",
            JSON.stringify(savedTasks)
        );

        displayTask("all");
    }
});

// All Tasks LIST
allTasksLink.addEventListener("click", function (e) {

    e.preventDefault();

    allTasksLink.style.color = "#157CF4";
    allTasksLink.style.borderBottom = "2px solid #157CF4";

    pendingTasksLink.style.color = "black";
    pendingTasksLink.style.borderBottom = "none";

    completedTasksLink.style.color = "black";
    completedTasksLink.style.borderBottom = "none";

    displayTask("all");
});

// COMPLETED Tasks LIST
completedTasksLink.addEventListener("click", function (e) {

    e.preventDefault();

    completedTasksLink.style.color = "#157CF4";
    completedTasksLink.style.borderBottom = "2px solid #157CF4";

    pendingTasksLink.style.color = "black";
    pendingTasksLink.style.borderBottom = "none";

    allTasksLink.style.color = "black";
    allTasksLink.style.borderBottom = "none";

    displayTask("completed");
});

// PENDING Tasks LIST
pendingTasksLink.addEventListener("click", function (e) {

    e.preventDefault();

    pendingTasksLink.style.color = "#157CF4";
    pendingTasksLink.style.borderBottom = "2px solid #157CF4";

    completedTasksLink.style.color = "black";
    completedTasksLink.style.borderBottom = "none";

    displayTask("pending");
});

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        addTask();
    }

});

//Delete ALL
clearButton.addEventListener("click", () => {
    savedTasks.splice(0, savedTasks.length);

    localStorage.setItem(
        "savedTasks",
        JSON.stringify(savedTasks)
    );

    clearButton.style.display = "none";
    displayTask("all");
})

displayTask("all");