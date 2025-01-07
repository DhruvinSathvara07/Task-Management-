const userId = document.getElementById("userId");
const userName = document.getElementById("userName");
const userSubmit = document.querySelector(".submit-btn");
const form = document.querySelector(".form");
const card = document.querySelector(".card-container");
const btn_edit = document.querySelector(".btn-edit");
const edituserID = document.getElementById("edituserID");
const edituserName = document.getElementById("edituserName");
const update = document.getElementById("update-btn");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    confirm("Your Form is Submitted Successfully");
    const data = {
        userID: userId.value,
        userName: userName.value
    }
    console.log(data);

    const users = JSON.parse(localStorage.getItem("userDatas")) || []
    users.push(data);
    localStorage.setItem("userDatas", JSON.stringify(users))
    location.reload();
    showData()
});

function showData() {
    const dataList = JSON.parse(localStorage.getItem("userDatas")) || [];
    let result = "";

    if (dataList.length === 0) {
        result = "<h1 class='text-center w-100 mt-3'>No user list found</h1>";
    } else {

        dataList.forEach((items, index) => {
            result += `
                <div class="card mt-5 ms-5 userlistData" style="width: 18rem;">
                    <div class="card-body">
                        <h3 class="card-title fs-5">User Id:${items.userID}</h3>
                        <h3 class="card-title fs-5">User Name:${items.userName}</h3>
                        <button class="btn btn-primary mt-3 btn-edit" data-bs-toggle="modal" href="#exampleModalToggle" onclick='handleEdit(${index})' role="button">Edit</button>
                        <button class="btn btn-danger mt-3" onclick='remove(${index})'>Delete</button>
                    </div>
                </div>            
            `;
        });
    }
    card.innerHTML = result;
}

function handleEdit(index) {
    const details = JSON.parse(localStorage.getItem("userDatas"));

    edituserID.value = details[index].userID;
    edituserName.value = details[index].userName;
    update.addEventListener("click", (e) => {
        e.preventDefault();
        const info = {
            userID: edituserID.value,
            userName: edituserName.value
        }

        const dataList = JSON.parse(localStorage.getItem("userDatas"))
        dataList.splice(index, 1, info)
        localStorage.setItem("userDatas", JSON.stringify(dataList))
        showData();
        location.reload()
        confirm("Your data is updated successfully");
    });
}

function remove(index) {
    const dataList = JSON.parse(localStorage.getItem("userDatas")) || []
    dataList.splice(index, 1);
    localStorage.setItem("userDatas", JSON.stringify(dataList));
    showData();
    confirm("Your data is deleted successfully");
}