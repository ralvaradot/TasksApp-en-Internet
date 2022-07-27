// JavaScript source code

let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
})

let formValidation = () => {
    if (textInput.value === "") {
        console.log('failure');
        msg.innerHTML = "Task cannot be blank";
    }
    else {
        console.log('success');
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "modal");
        })()
    }
}

let data = [];

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value
    });

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createTasks();
};

let createTasks = () => {
    tasks.innerHTML = "";
    // y representa el indice del array de pendiendo de cada objeto
    data.map((x, y) => {
        return (tasks.innerHTML += `
    <div id=${y}>
        <span class="fw-bold">${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.description}</p>

        <span class="options">
            <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-regular fa-pen-to-square"></i>
            <i onClick = "deleteTask(this); createTasks()" class="fa-regular fa-trash-can"></i>
        </span>
    </div>`);
    });

    resetForm();
}

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
}

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
}

let editTask = (e) => {
    // selecciono la tarjeta
    let selectedTask = e.parentElement.parentElement;

    // lleno los valores
    textInput.value = selectedTask.children[0].innerHTML;
    // --> <span class="fw-bold">${data.text}</span>
    dateInput.value = selectedTask.children[1].innerHTML;
    // --> <span class="small text-secondary">${data.date}</span>
    textarea.value = selectedTask.children[2].innerHTML;
    // --> <p>${data.description}</p>

    selectedTask.remove();
}

// funcion que recupera los datos del localStorage
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
})();
