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
                    <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/pencil.png" />
                    <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete.png" /></div></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);

    if (!todo) {
      todo = [];
    }
    let itemList = { item: todoValue.value, status: false };
    todo.push(itemList);
    setLocalStorage();
  }
  todoValue.value = "";
  setAlertMessage("Todo item Created Successfully!");
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
        : '<img class="todo-controls" src="/images/check-mark.png" />'
    }</div><div>
    ${
      style === ""
        ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/pencil.png" />'
        : ""
    }
    <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete.png" /></div></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
  });
}

//load the todo list items from local storage and display them on the page when the page is loaded
ReadToDoItems();