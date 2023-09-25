const body = document.querySelector("body");

let todoContainer;
let input;
let addBtn;
let taskMsg;
let todolList;
let todoEditBtn;
let todoEdit;
let editedTodo;
let editInput;
let editBtnAkcept;
let editBtnCancel;
let editMsg;

let todoListTasks = localStorage.getItem("todos_exercise")
  ? JSON.parse(localStorage.getItem("todos_exercise"))
  : [];

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  todoContainer = document.querySelector(".todo__container");
  input = document.querySelector(".todo__input--input");
  addBtn = document.querySelector(".btn__add");
  taskMsg = document.querySelector(".task__empty");
  todolList = document.querySelector(".todo__list");

  todoEditBtn = document.querySelector(".todo--edit");

  todoEdit = document.querySelector(".todo__edit__container");
  editInput = document.querySelector(".todo__edit__input--input");
  editBtnAkcept = document.querySelector(".btn__akcept");
  editBtnCancel = document.querySelector(".btn__cancel");
  editMsg = document.querySelector(".todo__edit__message");
};

const prepareDOMEvents = () => {
  addBtn.addEventListener("click", addTodo);
  todolList.addEventListener("click", checkClick);
  editBtnAkcept.addEventListener("click", updateTodo);
  editBtnCancel.addEventListener("click", cancelTodoEdit);
  input.addEventListener("keyup", checkIfEnterPress);
  editInput.addEventListener("keyup", checkIfEscPress);
};

const checkClick = (e) => {
  const check = e.target;

  if (check.matches(".todo--complete")) {
    check.closest(".task").classList.toggle("complete");
  } else if (check.matches(".todo--edit")) {
    editTodo(check);
  } else if (check.matches(".todo--delete")) {
    deleteTodo(check);
  }
};

const updateLocalStorage = (todoList) => {
  localStorage.removeItem("todos_exercise");
  localStorage.setItem("todos_exercise", JSON.stringify(todoList));
};

const addTodo = () => {
  if (input.value !== "") {
    const todoListLength = todolList.querySelectorAll(".task").length;
    const newTodo = document.createElement("div");
    newTodo.classList.add("task");
    newTodo.textContent = input.value;
    newTodo.setAttribute("id", todoListLength + 1);
    todoListTasks.push(input.value);
    localStorage.setItem("todos_exercise", JSON.stringify(todoListTasks));

    createTools(newTodo);

    todolList.append(newTodo);

    input.value = "";
    taskMsg.textContent = "";
  } else {
    taskMsg.textContent = "Wpisz tresc zadania";
  }
};

const createTools = (newTodo) => {
  const tools = document.createElement("div");
  tools.classList.add("task__btns");
  newTodo.append(tools);

  const completeBtn = document.createElement("button");
  const editBtnAkcept = document.createElement("button");
  const deleteBtn = document.createElement("button");

  completeBtn.classList.add("todo--complete");
  completeBtn.textContent = "V";

  editBtnAkcept.classList.add("todo--edit");
  editBtnAkcept.textContent = "EDIT";

  deleteBtn.classList.add("todo--delete");
  deleteBtn.textContent = "X";

  tools.append(completeBtn, editBtnAkcept, deleteBtn);
};

const editTodo = (e) => {
  todoEdit.classList.remove("hiden");
  todoContainer.classList.add("edit");
  const todoToEdit = e.closest(".task").getAttribute("id");
  editedTodo = document.querySelector(`[id = "${todoToEdit}"]`);

  editInput.value = editedTodo.firstChild.textContent;
};

const updateTodo = () => {
  if (editInput.value !== "") {
    const elementToEdit = editedTodo.firstChild.textContent;
    const elementIndex = todoListTasks.indexOf(elementToEdit);

    editedTodo.firstChild.textContent = editInput.value;
    const newTodos = (todoListTasks[elementIndex] = editInput.value);

    updateLocalStorage(todoListTasks)

    todoEdit.classList.add("hiden");
    todoContainer.classList.remove("edit");
    // editMsg.textContent = "";
  } else {
    editMsg.textContent = "Wypełnij pole!";
  }
};

const cancelTodoEdit = () => {
  editInput.value = "";
  todoEdit.classList.add("hiden");
  todoContainer.classList.remove("edit");
};

const deleteTodo = (e) => {
  const findElementToRemove = e.closest(".task").getAttribute("id") - 1;
  const newTodoList = todoListTasks
    .slice(0, findElementToRemove)
    .concat(todoListTasks.slice(findElementToRemove + 1, todoListTasks.length));

updateLocalStorage(newTodoList)

  location.reload();
};

const renderTodo = () => {
  todolList.replaceChildren("");
  if (todoListTasks.length) {
    todoListTasks.map((todo, index) => {
      const newTodo = document.createElement("div");
      newTodo.classList.add("task");
      if (todo.isDone) {
        newTodo.classList.add("complete");
      }
      newTodo.setAttribute("id", index + 1);
      newTodo.textContent = todo;
      createTools(newTodo);

      todolList.append(newTodo);
    });
  } else {
    taskMsg.textContent = "Brak zadań do wypełnienia";
  }
};

const LoadAtOpen = () => {
  renderTodo();
};

const checkIfEnterPress = (e) => {
  if (e.key === "Enter") {
    console.log("enter");
    addTodo();
  }
};

const checkIfEscPress = (e) => {
  if (e.key === "Escape") {
    console.log("escape");
    cancelTodoEdit();
  }
};

window.onload = LoadAtOpen;
document.addEventListener("DOMContentLoaded", main);
