const tbody = document.querySelector(".tbody");
const removeAll = document.querySelector(".removeAll");

function showhistoryData() {
    const deletetaskList = JSON.parse(localStorage.getItem("deletetaskData"));
    let historyResult = "";

    deletetaskList.forEach((items, index) => {
        historyResult += `
            <tr class="text-center">
                <td>${index + 1}</td>
                <td>${items[0].taskName}</td>
                <td>${items[0].taskDescription}</td>
                <td>${items[0].taskStatus}</td>
                <td>${items[0].user}</td>
                <td>
                <button class="btn btn-danger" onclick='removetableData(${index})'>Remove</button>
                <button class="btn btn-primary" onclick='restoreData(${index})'>Restore</button>
                </td>
            </tr>

        `;
        tbody.innerHTML = historyResult;
    });
}

showhistoryData();

function removetableData(index) {
    const deletetaskList = JSON.parse(localStorage.getItem("deletetaskData"));
    deletetaskList.splice(index, 1);
    localStorage.setItem("deletetaskData", JSON.stringify(deletetaskList))
    showhistoryData()
    location.reload();
    confirm("Your data is deleted successfully");
}

function alldelete() {
    localStorage.removeItem("deletetaskData");
    location.reload();
}

function restoreData(index) {
    const deletetaskList = JSON.parse(localStorage.getItem("deletetaskData"));
    const taskList = JSON.parse(localStorage.getItem("taskData"));

    taskList.push(deletetaskList[index][0]);
    deletetaskList.splice(index, 1);

    localStorage.setItem("taskData", JSON.stringify(taskList));
    localStorage.setItem("deletetaskData", JSON.stringify(deletetaskList));
    showhistoryData();
    location.reload();
    confirm("Your data is restored successfully");
}