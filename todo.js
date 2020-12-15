const todoForm = document.querySelector(".todo-form"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".todo-js"),
    finishList = document.querySelector(".done-js");
const TODOS_LS = "toDos";
let toDos = [];
let finish = [];
function finishToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    
    if (toDos[li.id-1].done ) {
        toDos[li.id-1].done = false;
        finishList.removeChild(li);
        
        todoList.appendChild(li);
        console.log(li)
    } else {
        toDos[li.id-1].done = true;
        todoList.removeChild(li);
        
        finishList.appendChild(li);
        console.log(li)
    }
    saveToDos();
}
function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    
    console.log(toDos, li.id);
    if (toDos[li.id-1].done) {
        finishList.removeChild(li);    
    } else {
        todoList.removeChild(li);
    }
    
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
    return li;
}
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function paintToDo(text, done) {
    const li = document.createElement("li");
    const delBtn = document.createElement("i");
    const checkBtn = document.createElement("i");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.classList.add("fas", "fa-trash-alt")
    delBtn.addEventListener("click", deleteToDo);
    
    checkBtn.classList.add("far", "fa-circle");
    checkBtn.addEventListener("click", finishToDo);
    
    span.innerText = text;
    li.classList.add("item");
    li.appendChild(span);
    li.appendChild(checkBtn);
    li.appendChild(delBtn);
    
    if (done) {
        finishList.appendChild(li);
    } else {
        todoList.appendChild(li);
    }
    
    li.id = newId;
    
    const toDoObj = {
        text,
        id: newId,
        done
    }
    
    toDos.push(toDoObj);
    
    
    saveToDos();
}

function handleSubmit(event) {
    
    event.preventDefault();
    const currentValue= todoInput.value;
    paintToDo(currentValue, false);
    todoInput.value = "";
}

function loadToDos() {
    const loadedDos = localStorage.getItem(TODOS_LS);
    if(loadedDos !== null){
        const parsedToDos = JSON.parse(loadedDos);
        parsedToDos.forEach(function(toDos){
            paintToDo(toDos.text, toDos.done);
        })
    } 
}

function init(){
    loadToDos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();