const createtaskForm = document.querySelector("#createTaskForm");
const taskName = document.querySelector(".taskName");
const taskDescription = document.querySelector(".taskDescription");
const TaskStatus = document.querySelector(".TaskStatus");
const selectUsers = document.querySelector(".selectUsers");

function showcreateTask() {
    const dataList = JSON.parse(localStorage.getItem("userDatas"));

    let tasks = `<option value="kdfkdsk" disabled selected>Seleact a Employee</option>`;
    dataList.forEach((item) => {
        tasks += `
        <option value="${item.userName}">${item.userName}</option>`;
    });
    selectUsers.innerHTML = tasks;
}

showcreateTask();

createtaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const createtaskData = {
        taskName: taskName.value,
        taskDescription: taskDescription.value,
        taskStatus: TaskStatus.value,
        user: selectUsers.value
    };

    const taskUser = JSON.parse(localStorage.getItem("taskData")) || []
    taskUser.push(createtaskData);
    localStorage.setItem("taskData", JSON.stringify(taskUser))
    confirm("Your Task has been created successfully");
    location.reload();
});

function showtaskDatas() {
    const taskdataList = JSON.parse(localStorage.getItem("taskData"));
    let taskResult = ""

    taskdataList.forEach((item, index) => {
        taskResult += `
         <div class="card mt-5 ms-5 userlistData" style="width: 18rem;">
                <div class="card-body">
                    <h3 class="card-title fs-5">Task Name:${item.taskName}</h3>
                    <h3 class="card-title fs-5">Task Description:${item.taskDescription}</h3>
                    <h3 class="card-title fs-5">Task Status:${item.taskStatus}</h3>
                    <h3 class="card-title fs-5">User:${item.user}</h3>
                    <button class="btn btn-primary mt-3 btn-edit" data-bs-toggle="modal" href="#exampleModalToggle" onclick='edittaskList(${index})' role="button">Edit</button>
                    <button class="btn btn-danger mt-3 ms-2">Delete</button>
                </div>
            </div>
        `;
        taskList_cards.innerHTML = taskResult
    })
}
// const editForm = document.querySelector("#editForm");
// const editTask = document.querySelector("#edittaskName");
// const edittaskDescription = document.querySelector("#edittaskDescription");
// const edittaskStatus = document.querySelector("#edittaskStatus");
// const edittaskUser = document.querySelector("#edittaskUser");

// console.log(editForm);

