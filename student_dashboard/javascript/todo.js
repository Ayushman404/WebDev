let localData = JSON.parse(localStorage.getItem("user1")) || { tasks: [] };
let myTasks = localData.tasks || [];
// let taskCounter = Number(localStorage.getItem("taskCounter")) || 1;

// DOM Elements
const taskAddBtn = document.getElementById("taskAdd");
const modalTask = document.getElementById("modalTask");
const cancelTaskFormBtn = document.getElementById("closeTaskFormBtn");
const taskForm = document.getElementById("addTaskForm");
const addTaskContainer = document.getElementById("task-list-container");

// Date format helper
function formatDate(val) {
    const [year, month, day] = val.split("-");
    return `${day}/${month}/${year}`;
}

//  Render All Tasks
function renderTasks() {
    addTaskContainer.innerHTML = "";
    myTasks.forEach((task, index) => {
        addTask(task, index);
    });
}

//  Add Task
function addTask(task, index) {
    const div = document.createElement("div");
        div.setAttribute("data-task-index", index);
        // div.id = `task-${task.id}`;
        div.classList.add("task-item");

        div.innerHTML = `
            <div class="task-content">
                <span class="task-title" style="${task.isDone ? 'text-decoration: line-through; color: #666;' : ''}">
                    ${task.title}
                </span>
                <div class="task-detail">
                    <span class="task-priority task-meta">Priority: ${task.priority}</span>
                    <span class="task-due task-meta">Due: ${task.due}</span>
                </div>
            </div>
            <div class="task-actions">
                <button title="mark complete"><i class="fa-regular fa-circle-check mark-complete-task"></i></button>
                <button title="Edit" class="task-edit-btn"><i class="fas fa-edit"></i></button>
                <button title="Delete" class="delete-task-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;

        addTaskContainer.appendChild(div);
}
//  Delete Task
document.addEventListener("click", (e) => {
    if (e.target.closest(".delete-task-btn")) {
        const card = e.target.closest(".task-item");
        const index = Number(card.getAttribute("data-task-index"));
        myTasks.splice(index, 1);
        localData = JSON.parse(localStorage.getItem("user1")) || { tasks: [] };
        localData.tasks = myTasks;
        localStorage.setItem("user1", JSON.stringify(localData));
        renderTasks();
    }
});


//Edit Task
document.addEventListener("click", (e) => {
    if (e.target.closest(".task-edit-btn")) {
        const card = e.target.closest(".task-item");
        const index = Number(card.getAttribute("data-task-index"));
        const task = myTasks[index];

        document.getElementById("taskTitle").value = task.title;
        document.getElementById("taskPriority").value = task.priority;
        document.getElementById("taskDueDate").value = task.due.split("/").reverse().join("-");

        modalTask.style.display = "flex";

        myTasks.splice(index, 1);
        localData = JSON.parse(localStorage.getItem("user1")) || { tasks: [] };
        localData.tasks = myTasks;
        localStorage.setItem("user1", JSON.stringify(localData));   

    }
});

// Mark Task Complete
document.addEventListener("click", (e) => {
    if (e.target.closest(".mark-complete-task")) {
        const card = e.target.closest(".task-item");
        const index = Number(card.getAttribute("data-task-index"));
        myTasks[index].isDone = !myTasks[index].isDone;
        localData = JSON.parse(localStorage.getItem("user1")) || { tasks: [] };
        localData.tasks = myTasks;
        localStorage.setItem("user1", JSON.stringify(localData));
        renderTasks();
    }
});

//  Open Add Task Modal
taskAddBtn.addEventListener("click", () => {
    modalTask.style.display = "flex";
});

//  Close Modal
cancelTaskFormBtn.addEventListener("click", () => {
    modalTask.style.display = "none";
    taskForm.reset();
});

//  Form Submit Handler
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskTitle = document.getElementById("taskTitle").value;
    const taskPriority = document.getElementById("taskPriority").value;
    const taskDueDate = document.getElementById("taskDueDate").value;

    const newTask = {
        // id: myTasks.length ? myTasks[myTasks.length - 1].id + 1 : 1,
        title: taskTitle.charAt(0).toUpperCase() + taskTitle.slice(1),
        priority: taskPriority.charAt(0).toUpperCase() + taskPriority.slice(1),
        due: formatDate(taskDueDate),
        isDone: false
    };

    myTasks.push(newTask);
    localData = JSON.parse(localStorage.getItem("user1")) || { tasks: [] };
    localData.tasks = myTasks;

    
    localStorage.setItem("user1", JSON.stringify(localData));
    modalTask.style.display = "none";
    taskForm.reset();
    renderTasks();
});

//  On load
renderTasks();
// const taskList = document.getElementById("task-list-container");