//selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

//eventlistiner
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteItem)
filterOption.addEventListener('click', filterOptionFun)
//funcs

//func to add an item to the list
function addTodo(event) {
    //prevent form from submitting 
    event.preventDefault()
    //todo div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    //create li 
    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)
    todoInput.value = ""
    //complete button 
    const completeButton = document.createElement("button")
    completeButton.innerHTML = '<li class="fas fa-check"></li>'
    completeButton.classList.add("complete-btn")
    todoDiv.appendChild(completeButton)
    //remove button 
    const trashButton = document.createElement("button")
    trashButton.innerHTML = '<li class="fas fa-trash"></li>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)
    todoList.appendChild(todoDiv)
}

//remove an item from the list 
function deleteItem(e) {

    //remove an iteme
    const item = e.target
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement
        todo.classList.add("fall")
        todo.addEventListener("transitionend", () => {
            todo.remove()
        })
    }
    //check an item 
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement
        todo.classList.toggle("complete")
    }
}

//filter the list 
function filterOptionFun(e) {
    const todos = todoList.childNodes
    todos.forEach(todo => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex"
                break;
            case "complete":
                if (todo.classList.contains('complete')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
            case "uncomplete":
                if (!todo.classList.contains('complete')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
        }
    });
}
