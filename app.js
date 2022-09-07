// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded' , getTodos);
todoButton.addEventListener('click' , addTodo);
todoList.addEventListener('click' , deleteCheck);
filterOption.addEventListener('click' , filterTodo);

// Functions 
function addTodo(event){
    // Stops form from submitting 
event.preventDefault();
    // Create our todo DIVs
const todoDiv = document.createElement('div');    
    // Add a class to our DIV
todoDiv.classList.add('todo');
    // Create our li's
const newTodo = document.createElement('li');
    // Adding a value to our li to check it works
newTodo.innerText = todoInput.value;
    // Adding a class to our li so that we can style this in css
newTodo.classList.add('todo-item');
    // Adding our li element into the div we created earlier
todoDiv.appendChild(newTodo);
    // Add todo to local storage  
saveLocalTodos(todoInput.value);
    // Check Mark button
const completedButton = document.createElement('button');
    // Adding an icon to our check mark button
completedButton.innerHTML = '<i class="fas fa-check"></i>';
    // Adding a class to our 'completed' button
completedButton.classList.add("complete-btn")
    // Adding our button element into the div we created earlier
todoDiv.appendChild(completedButton);
    // Trash button
const trashButton = document.createElement('button');
    // Adding an icon to our trash mark button
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    // Adding a class to our 'trash' button
trashButton.classList.add("trash-btn")
    // Adding our button element into the div we created earlier
todoDiv.appendChild(trashButton);
    // Append to list
todoList.appendChild(todoDiv);
    // Clear Todo Input value
todoInput.value = "";

}

function deleteCheck(e){
    // Delete Item functionality 
    const item = e.target;
    // Creating an If statement to target the trash button
    if (item.classList[0] === 'trash-btn'){
    // Appending our todo to the parent to enable us to remove entire todo after click
    const todo = item.parentElement;
    // Adding animation to our remove function
    todo.classList.add('fall');
    // Removing todos in local storage
    removeLocalTodos(todo);
    // Removing our todo after our transition ends
    todo.addEventListener('transitionend', function(){
        todo.remove();
    });
    }
    
    // Check Item functionality
    if (item.classList[0] === 'complete-btn'){
    // Appending our todo to the parent to enable us to check entire todo after click
    const todo = item.parentElement;
    // Adding a toggle to our completed todos
    todo.classList.toggle('completed');
    }
}

 // Grab all the todos and child nodes for our new function (Line 84)
 // Loop over all of our todos, with a for loop, to check what todo type we are clicking (Line 85)
 // We now have access to each individual todo and will use a switch to bring bck the value inside each option tag (in our HTML doc) (Line 86)
 // Show all todos when we click on 'All' filter option (Line 87 - 89)
 // Checking the todos that have the class of completed (Line 91)
 // And then showing them with 'flex' (Line 92)
 // Remove todos that do not have the class of completed (Line 93 -94)
 // Add a break; and repeat for Incompleted filter
 // Add exclamation mark for the new if statement to check for todos that *don't* contain completed

 function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":  
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'; 
                } else{
                    todo.style.display = 'none';
                }
                
        }
    });
   
}

    // Check if todos are already in local storage
    // If local storage is already in use save new todo into the local storage
    // If no todos ae present create new empty array
    // Push new array into new array for local storage 
function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


// Making todos stored in local storage visible in our UI
// Check again if we have todos saved to our local storage 
// Retreive todos aved to local storage 
// Loop over our todos
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');    
    // Add a class to our DIV
todoDiv.classList.add('todo');
    // Create our li's
const newTodo = document.createElement('li');
    // Adding a value to our li to check it works
newTodo.innerText = todo;
    // Adding a class to our li so that we can style this in css
newTodo.classList.add('todo-item');
    // Adding our li element into the div we created earlier
todoDiv.appendChild(newTodo);
    // Check Mark button
const completedButton = document.createElement('button');
    // Adding an icon to our check mark button
completedButton.innerHTML = '<i class="fas fa-check"></i>';
    // Adding a class to our 'completed' button
completedButton.classList.add("complete-btn")
    // Adding our button element into the div we created earlier
todoDiv.appendChild(completedButton);
    // Trash button
const trashButton = document.createElement('button');
    // Adding an icon to our trash mark button
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    // Adding a class to our 'trash' button
trashButton.classList.add("trash-btn")
    // Adding our button element into the div we created earlier
todoDiv.appendChild(trashButton);
    // Append to list
todoList.appendChild(todoDiv);
    });
}

// Remove local storage todos that have been deleted 
// Use array method to remove specific items in our local storage array 
// Retreive index of todo that you wish to delete
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}