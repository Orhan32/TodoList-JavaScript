// Formdaki Elementleri Seçme

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadTodosUı);
    secondCardBody.addEventListener("mouseup", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
}

function deleteTodo(e) {
    if (e.target.className === "fa-solid fa-trash-can") {
        e.target.parentElement.parentElement.remove();
        deleteTodoStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo Başarıyla Silindi.", 1500);
    }
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();
    if (newTodo !== "") {
        addTodoUi(newTodo);
        addTodoStorage(newTodo);
        showAlert("success", "Todo Başarılı Bir Şekilde Eklendi.");
    }
    else {
        showAlert("info", "Lütlen Bir Değer Giriniz!");
    }
    e.preventDefault();
}

function addTodoUi(newTodo) {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-start";

    const listText = document.createElement("div");
    listText.className = "ms-2 me-auto";
    listText.textContent = newTodo;

    const listLink = document.createElement("a");
    listLink.href = "#";
    listLink.innerHTML = "<i style='color: #2160D4;' class='fa-solid fa-trash-can'></i>";

    listItem.appendChild(listText);
    listItem.appendChild(listLink);

    secondCardBody.appendChild(listItem);

}

function loadTodosUı() {
    let todos = getTodosStorage();
    todos.forEach(function (todo, index) {
        addTodoUi(todo);
    });
}

function getTodosStorage() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoStorage(newTodo) {
    let todos = getTodosStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodoStorage(deleteTodo) {
    let todos = getTodosStorage();
    todos.forEach(function (todo, index) {
        if (todo === deleteTodo) {
            todos.splice(index, 1);
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(listItem => {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            // Bulamadı
            listItem.setAttribute("style", "display: none !important");
        }
        else {
            listItem.setAttribute("style", "display: block");
        }
    });
}

function showAlert(color, text) {
    const alert = document.createElement("div");
    alert.className = "alert alert-" + color;
    alert.setAttribute("role", "alert");
    alert.textContent = text;
    firstCardBody.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 1500);
}
