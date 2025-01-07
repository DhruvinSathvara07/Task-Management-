const taskList_cards = document.querySelector("#taskList-cards");
const editForm = document.querySelector("#editForm");
const editTask = document.querySelector("#edittaskName");
const edittaskDescription = document.querySelector("#edittaskDescription");
const edittaskStatus = document.querySelector("#edittaskStatus");
const edittaskUser = document.querySelector("#edittaskUser");
const tasklistUpdate = document.querySelector(".tasklistUpdate");

function showtaskDatas() {
    const taskdataList = JSON.parse(localStorage.getItem("taskData")) || [];
    // console.log(taskdataList);
    let taskResult = "";

    if (taskdataList.length === 0) {
        taskResult = "<h1 class='text-center w-100 mt-3'>No task list found</h1>";
    } else {
        taskdataList.forEach((item, index) => {
            taskResult += `
            <div class="card mt-5 ms-5 userlistData" style="width: 18rem;">
            <div class="card-body">
            <h3 class="card-title fs-5">Task Name: ${item.taskName}</h3>
            <h3 class="card-title fs-5">Task Description: ${item.taskDescription}</h3>
            <h3 class="card-title fs-5">Task Status: ${item.taskStatus}</h3>
            <h3 class="card-title fs-5">User: ${item.user}</h3>
            <button class="btn btn-primary mt-3 btn-edit" data-bs-toggle="modal" href="#exampleModalToggle" onclick='edittaskList(${index})' role="button">Edit</button>
            <button class="btn btn-danger mt-3 ms-2" onclick='removtaskList(${index})'>Delete</button>
            </div>
            </div>`;
        });
    }
    taskList_cards.innerHTML = taskResult;
}

showtaskDatas();

function edittaskList(index) {
    const taskdataList = JSON.parse(localStorage.getItem("taskData"));

    editTask.value = taskdataList[index].taskName;
    edittaskDescription.value = taskdataList[index].taskDescription;
    edittaskStatus.value = taskdataList[index].taskStatus;
    edittaskUser.value = taskdataList[index].user;

    tasklistUpdate.addEventListener("click", function updateTask(e) {
        e.preventDefault();

        const tasklistDatas = {
            taskName: editTask.value,
            taskDescription: edittaskDescription.value,
            taskStatus: edittaskStatus.value,
            user: edittaskUser.value
        };

        const taskdataList = JSON.parse(localStorage.getItem("taskData"));
        taskdataList.splice(index, 1, tasklistDatas);
        localStorage.setItem("taskData", JSON.stringify(taskdataList));
        showtaskDatas();
        location.reload();
        confirm("Your data is updated successfully");
    });
}

function removtaskList(index) {
    const taskdataList = JSON.parse(localStorage.getItem("taskData")) || [];
    const removeData = taskdataList.splice(index, 1);
    localStorage.setItem("taskData", JSON.stringify(taskdataList));

    const deletetaskList = JSON.parse(localStorage.getItem("deletetaskData")) || [];
    deletetaskList.push(removeData);
    localStorage.setItem("deletetaskData", JSON.stringify(deletetaskList));
    showtaskDatas();
    location.reload();
    confirm("Your data is deleted successfully");
}