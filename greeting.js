const form = document.querySelector(".name-js"),
    input = form.querySelector("input"),
    greeting = document.querySelector("h3");



const showing = "greeting";

function delName(event) {
    form.classList.add(showing);
    greeting.classList.remove(showing);
    localStorage.removeItem("usrName");
    input.value = "";
    askName();
    
    
}
function storeUser(event) {
    event.preventDefault();
    const name = input.value;
    paintGreeting(name);
    localStorage.setItem("usrName", name);
}
function askName(){
    form.classList.add(showing);
    form.addEventListener("submit", storeUser);
}
function paintGreeting(usrName){
    form.classList.remove(showing);
    greeting.classList.add(showing);
    const editBtn = document.createElement("button");
    editBtn.innerText = "edit"
    const delBtn = document.createElement("button");
    delBtn.innerText = "dele"
    greeting.innerText = `Welcome! This is ${usrName}'s planner`
    greeting.appendChild(editBtn);
    greeting.appendChild(delBtn);

    editBtn.addEventListener("click", askName)
    delBtn.addEventListener("click", delName)
    
}

function loadName() {
    const usrName = localStorage.getItem("usrName");
    if (usrName === null) {
        askName();
    } else {
        paintGreeting(usrName);
    }
}    
function init() {
    loadName()
}
init();