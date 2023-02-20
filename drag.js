
let todos = [];
let inProgress = [];
let done = [];
let bin = [];

function addtask() {

    var tasktext = document.getElementById("task").value;
    if (!tasktext) {
        alert("add something");

        return;
    }

    const todoItem = { text: tasktext, id: Date.now() };
    var list = appendToDoItem(document.getElementById("myTodoContainer"), todoItem)
    // list.style.color = "black";
    document.getElementById("task").value = "";
    todos.push(todoItem)
    syncTodos();
    // setdata("todolist", todos)

}
function appendToDoItem(destionation_to_append, todo_item = { text: '', id: '' }) {
    const textnode = document.createTextNode(todo_item.text);
    var newtask = document.createElement("p");
    newtask.addEventListener("dragstart", drag, true);
    newtask.setAttribute('draggable', 'true');
    newtask.setAttribute('id', todo_item.id);
    newtask.appendChild(textnode);
    return destionation_to_append.appendChild(newtask);
}

loadtodo()
let container_to_list_map = {
    myTodoContainer: todos,
    inProgressContainer: inProgress,
    doneContainer: done,
    bin: bin
}

function setdata(key, value) {
    localStorage.setItem(key, JSON.stringify(value));

}

function getdata(key) {
    return JSON.parse(localStorage.getItem(key));
}

function loadtodo() {
    let todolist = getdata("todolist") || []
    todolist.forEach((todoItem, index) => {
        let list = appendToDoItem(document.getElementById("myTodoContainer"), todoItem)
    });
    todos = todolist || [];



    let inProgressList = getdata("inProgress") || []
    inProgressList.forEach((todoItem, index) => {
        let list = appendToDoItem(document.getElementById("inProgressContainer"), todoItem)
    });
    inProgress = inProgressList || [];



    let doneList = getdata("donelist") || []
    doneList.forEach((todoItem, index) => {
        let list = appendToDoItem(document.getElementById("doneContainer"), todoItem)
    });
    done = doneList || [];




    let binlist = getdata("binlist") || []
    binlist.forEach((todoItem, index) => {
        let list = appendToDoItem(document.getElementById("bin"), todoItem)
    });
    bin = binlist || [];



}


function drag(event) {
    console.log("drags tart");
    console.log(event.target.parentElement?.id);
    let event_message = {
        container_id: event.target.parentElement?.id,
        todoId: event.target.id
    }
    event.dataTransfer.setData("text/plain", JSON.stringify(event_message));
}



function allowDrop(event) {
    event.preventDefault();
}


function drop(event) {
    var event_message = event.dataTransfer.getData("text");
    event_message = JSON.parse(event_message);

    console.log(event.target.id, event.source)

    let target_container_id = event.target.id;
    if (target_container_id in container_to_list_map) {
        let to = container_to_list_map[target_container_id];
        let from = container_to_list_map[event_message.container_id];

        const source_elem = document.getElementById(event_message.todoId);
        event.target.appendChild(source_elem);
        event.preventDefault();


        moveTodoItem(from, to, event_message.todoId);
        syncTodos();
    }
}

function syncTodos() {
    setdata("todolist", todos);
    setdata("inProgress", inProgress);
    setdata("donelist", done);
    setdata("binlist", bin)
}

function moveTodoItem(from = [], to = [], todoItemId) {
    // // move
    // finding todo index
    const todoIndex = from.findIndex((todo) => todo.id === parseInt(todoItemId));
    let todoItem = null;
    if (todoIndex > -1) {
        todoItem = from[todoIndex];
        // deleting process
        from.splice(todoIndex, 1);
        to.push(todoItem);
    }

}





// delete todos
function deltodos() {
    let result = confirm('are you sure you want to clear the bin?');
    if (result) {
        document.getElementById("bin").innerHTML = "";
        bin.splice(0, bin.length);
        syncTodos();
    }
}

var audio = document.getElementById("heartbeat");
//     document.getElementById("SoundOnHover").addEventListener( 'mouseover' , function () {
//         audio.play();
//     })



// window.onload = function () {
//     var audio = document.getElementById("heartbeat");
//     document.getElementById("SoundOnHover").addEventListener( 'mouseover' , function () {
//         audio.play();
//     })

// }

// function findMax(A = []) {
//     let max = 0;
//     for (i = 0; i < A.length; i++) {
//         let element = A[i];
//         if (element > max)
//             max = element
//     }
//     return A.indexOf;

// }

// // Find second max
function secondMax(A = []) {
    let max2 = 0;
    let max = 0;
    for (i = 0; i < A.length; i++) {
        let elem = A[i];
        if (elem > max) {
            max2 = max;
            max = elem;
        }
        else if (elem > max2) {
            max2 = elem;
        }
console.log(max, max2, A[i]);
    }

    return max2;
}

