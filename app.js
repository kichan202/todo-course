//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
//change from 'click' to 'change'
filterOption.addEventListener('change', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

//functions
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    //todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerHTML=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo)
    //Save to local storage
    saveLocalTodos(todoInput.value)

    //Check MArk Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);
    //clear Todo input value
    todoInput.value = "";

}

function deleteCheck(event){
    const item = event.target;
    //DETELE TODO
    if(item.classList[0] === 'trash-btn'){
        //go to the parent element and remove it
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();

        });
    }

    //CHECK MARK
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


/**
 * 
 * https://stackoverflow.com/questions/64469842/complete-and-uncompleted-todos 
 */
function filterTodo(event){
    const todos = [...todoList.children];
    todos.forEach(function(todo, index){
        switch(event.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }

    });

}

function saveLocalTodos(todo){
    //Check -- hey Do i already have a key todos in there?
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//load the todos from the localstorage when the document loads
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') == null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(function(todo){
            //Create the todo
            const todoDiv = document.createElement('div');
            todoDiv.classList.add("todo");

            const newTodo = document.createElement('li');
            newTodo.classList.add("todo-item");
            newTodo.innerHTML = todo;
            todoDiv.appendChild(newTodo);

            //Check MArk Button
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fas fa-check"></i>';
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);

            //Check trash button
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);

            todoList.appendChild(todoDiv);

        });
    }
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1); 
    localStorage.setItem("todos", JSON.stringify(todos));
}
