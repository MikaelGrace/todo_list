//using factory function to create a todo list item instead of a class
const TodoList = () => {
    const title = "";
    const description = "";
    const dueDate = "";
    const priority = "";
    const notes = "";
    const checklist = [];
    return {
        title,
        description,
        dueDate,
        priority,
        notes,
        checklist
    };
}

//declare variales for DOM targets
const todoValue = document.querySelector("#todoText");
const todoAlert = document.querySelector("#Alert");
const listItems = document.querySelector("#list-items");
const addUpdate = document.querySelector("#AddUpdateClick");

//declaring local storage variable to hold the todo list items
let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
    todo = [];
}

//function to create a new todo list item

function CreateToDoItems() {
  if (todoValue.value === "") {
    todoAlert.innerText = "Please enter your todo text!";
    todoValue.focus();
  } else {
    let IsPresent = false;
    todo.forEach((element) => {
      if (element.item == todoValue.value) {
        IsPresent = true;
      }
    });

    if (IsPresent) {
      setAlertMessage("This item already present in the list!");
      return;
    }

    let li = document.createElement("li");
    const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${todoValue.value}</div><div>
                    <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="images/Pencil-1--Streamline-Ultimate.png" />
                    <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="images/Bin-1--Streamline-Ultimate.png" /></div></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);

    if (!todo) {
      todo = [];
    }
    let itemList = { item: todoValue.value, status: false };
    todo.push(itemList);
    setLocalStorage();
    setAlertMessage("Todo item Created Successfully!");
  }
  todoValue.value = "";
  
}

//function to read the todo list items from local storage and display them on the page
function ReadToDoItems() {
  todo.forEach((element) => {
    let li = document.createElement("li");
    let style = "";
    if (element.status) {
      style = "style='text-decoration: line-through'";
    }
    const todoItems = `<div ${style} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${
      element.item
    }
    ${
      style === ""
        ? ""
        : '<img class="todo-controls" src="images/Check--Streamline-Sharp.png" />'
    }</div><div>
    ${
      style === ""
        ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="images/Pencil-1--Streamline-Ultimate.png" />'
        : ""
    }
    <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="images/Bin-1--Streamline-Ultimate.png" /></div></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
  });
}

//load the todo list items from local storage and display them on the page when the page is loaded
ReadToDoItems();

//function to update a todo list item
function UpdateToDoItems(e) {
  if (
    e.parentElement.parentElement.querySelector("div").style.textDecoration ===
    ""
  ) {
    todoValue.value =
      e.parentElement.parentElement.querySelector("div").innerText;
    updateText = e.parentElement.parentElement.querySelector("div");
    addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
    addUpdate.setAttribute("src", "images/Triangle-Arrow-Synchronize--Streamline-Outlined-Streamline-Material.png");
    todoValue.focus();
  }
}

function UpdateOnSelectionItems() {
  let IsPresent = false;
  todo.forEach((element) => {
    if (element.item == todoValue.value) {
      IsPresent = true;
    }
  });

  if (IsPresent) {
    setAlertMessage("This item already present in the list!");
    return;
  }

  todo.forEach((element) => {
    if (element.item == updateText.innerText.trim()) {
      element.item = todoValue.value;
    }
  });
  setLocalStorage();

  updateText.innerText = todoValue.value;
  addUpdate.setAttribute("onclick", "CreateToDoItems()");
  addUpdate.setAttribute("src", "images/Plus-Math-Symbol-Circle--Streamline-Ultimate.png");
  todoValue.value = "";
  setAlertMessage("Todo item Updated Successfully!");
}

//function to delete a todo list item
function DeleteToDoItems(e) {
  let deleteValue =
    e.parentElement.parentElement.querySelector("div").innerText;

  if (confirm(`Are you sure. Due you want to delete this ${deleteValue}!`)) {
    e.parentElement.parentElement.setAttribute("class", "deleted-item");
    todoValue.focus();

    todo.forEach((element) => {
      if (element.item == deleteValue.trim()) {
        todo.splice(element, 1);
      }
    });

    setTimeout(() => {
      e.parentElement.parentElement.remove();
    }, 1000);

    setLocalStorage();
  }
}

//function to mark a todo list item as completed
function CompletedToDoItems(e) {
  if (e.parentElement.querySelector("div").style.textDecoration === "") {
    const img = document.createElement("img");
    img.src = "images/Check--Streamline-Sharp.png";
    img.className = "todo-controls";
    e.parentElement.querySelector("div").style.textDecoration = "line-through";
    e.parentElement.querySelector("div").appendChild(img);
    e.parentElement.querySelector("img.edit").remove();

    todo.forEach((element) => {
      if (
        e.parentElement.querySelector("div").innerText.trim() == element.item
      ) {
        element.status = true;
      }
    });
    setLocalStorage();
    setAlertMessage("Todo item Completed Successfully!");
  }
}

//function to set the local storage
function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}

//function to set the alert message
function setAlertMessage(message) {
  todoAlert.removeAttribute("class");
  todoAlert.innerText = message;
  setTimeout(() => {
    todoAlert.classList.add("toggleMe");
  }, 1000);
}

