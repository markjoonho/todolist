const todoForm = document.querySelector(".todo-form"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".todo-js"),
    finishList = document.querySelector(".done-js");

const LIST = 'list'
let works = []
function todoResult(event) {
    const btn = event.target;
    const li = btn.parentNode;

    let pos = 0;
    for (let i = 0; i < works.length; i++) {
        if (works[i].id === parseInt(li.id)) {
           pos = i; 
        }
    }
    console.log(pos);
    console.log(li.id);
    if (li.querySelector(".fa-square") === null) {
        li.querySelector(".fa-check-square").classList.add("fa-square");
        li.querySelector(".fa-check-square").classList.remove("fa-check-square");
        finishList.removeChild(li);
        todoList.appendChild(li);
        works[pos].done = false;
        
    } else {
        li.querySelector(".fa-square").classList.add("fa-check-square");
        li.querySelector(".fa-square").classList.remove("fa-square");
        todoList.removeChild(li);
        finishList.appendChild(li);
        works[pos].done = true;
    }
    saveToDos();
}

function deleteResult(event) {
    const btn = event.target;
    const li = btn.parentNode;
    if (li.querySelector(".fa-square") === null) {
        finishList.removeChild(li);
    } else {
        todoList.removeChild(li);
    }
    const cleanToDos = works.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    works = cleanToDos;
    saveToDos();
}
function saveToDos() {
    localStorage.setItem(LIST, JSON.stringify(works));
}
function inputTodo(value, done) {
    
    
    const li = document.createElement("li");
    const span = document.createElement("span");
    const todoButton = document.createElement("i");
    const deleteButton = document.createElement("i");
     //fa-check-square
    deleteButton.classList.add("fas", "fa-trash-alt");
    todoButton.addEventListener("click", todoResult);
    deleteButton.addEventListener("click", deleteResult);
    const id = works.length;
    li.id = id;
    if (done) {
        finishList.appendChild(li);
        todoButton.classList.add ("far", "fa-check-square");
    } else {
        todoList.appendChild(li);
        todoButton.classList.add ("far", "fa-square");
    }
    span.innerHTML = value;  
    li.appendChild(span);
    li.appendChild(todoButton);
    li.appendChild(deleteButton);
    
    
    
    const toDoObj = {
        text:value,
        id,
        done
    }
    
    
    works.push(toDoObj);
    saveToDos();
}


function paintToDo() {
    const loadedData = localStorage.getItem(LIST);
    if(loadedData !== null) {
        //printing loadedData
        const parsedToDos = JSON.parse(loadedData);
        parsedToDos.forEach(function(toDos){
            inputTodo(toDos.text, toDos.done);
        })
    }
}
function submitTodo(event) {
    event.preventDefault();
    const value = todoInput.value;
    inputTodo(value, false);
    todoInput.value = '';
}
function init() {
    paintToDo();
    todoForm.addEventListener("submit", submitTodo);
}
init();