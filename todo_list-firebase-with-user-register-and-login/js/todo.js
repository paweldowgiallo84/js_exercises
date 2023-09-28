const firebaseConfig = {
  apiKey: "AIzaSyDJAxPc4o4ioF30wg4E5bFtU5OimFC50_U",
  authDomain: "js-exercises-todo.firebaseapp.com",
  databaseURL: "https://js-exercises-todo-default-rtdb.firebaseio.com",
  projectId: "js-exercises-todo",
  storageBucket: "js-exercises-todo.appspot.com",
  messagingSenderId: "332822760574",
  appId: "1:332822760574:web:6cc3d73904d36b5b719c2f",
};

// const app = firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

// const user = document.querySelector(".user");
const userEmail = JSON.parse(localStorage.getItem("userEmail"));
const testInput = document.querySelector(".input__test");
const taskDate = document.getElementById("task--date");
const taskDescription = document.getElementById("task--desctiption");

// if (userEmail) {
//   console.log("User email:", userEmail);
//   user.textContent = userEmail
// } else {
//   console.log("not working");
// }

const addTodoBtn = document.getElementById("add__todo__btn");
const taskDoneBtn = document.getElementById("taskDone");
const taskEditBtn = document.getElementById("taskEdit");
const taskDeleteBtn = document.getElementById("taskDelete");
const logoutBtn = document.getElementById("todo__logout");

function addTodo() {
  const todoInput = document.getElementById("todo__input");
  const dateInput = document.getElementById("todo__date");

  if (todoInput.value.length != 0 && dateInput.value.length != 0) {
    var user = auth.currentUser;
    const todoKey = database
      .ref("users/" + user.uid + "unfinished_task/")
      .push().key;

    if (user) {
      const userData = {
        [todoKey]: {
          date: dateInput.value,
          task: todoInput.value,
          key: todoKey,
        },
      };

      const userRef = database.ref("users/" + user.uid + "/unfinished_task");

      userRef
        .update(userData)
        .then(() => {
          todoInput.value = "";
          dateInput.value = "";
        })

        .catch((error) => {
          console.error("Error while updating user data", error);
        });
      showTaskToBeDone();
    } else {
      console.error("User is not authenticated");
    }
  } else {
    console.error("Please fill task and data field");
  }
}

const showTaskToBeDone = () => {
  const todoToComplete = document.getElementsByClassName("task__container")[0];
  todoToComplete.innerHTML = "";

  var user = auth.currentUser;

  auth.onAuthStateChanged((user) => {
    if (user) {
      const taskArray = [];
      database
        .ref("users/" + user.uid + "/unfinished_task")
        .on("value", (snapshot) => {
          snapshot.forEach((childShapshot) => {
            const childData = childShapshot.val();
            taskArray.push(Object.values(childData));
          });

          for (let i = 0; i < taskArray.length; i++) {
            const task_date = taskArray[i][0];
            const task_key = taskArray[i][1];
            const task_Description = taskArray[i][2];

            const task_container = document.createElement("div");
            task_container.setAttribute("id", "task");
            task_container.setAttribute("key", task_key);

            todoToComplete.append(task_container);

            const single_task_description = document.createElement("p");
            single_task_description.setAttribute("id", "task--desctiption");
            single_task_description.setAttribute("contenteditable", false);
            single_task_description.innerHTML = task_Description;

            task_container.append(single_task_description);

            const task_tools_container = document.createElement("div");
            task_tools_container.setAttribute("id", "task__tools__container");
            task_container.append(task_tools_container);

            const vertical_line = document.createElement("hr");

            task_tools_container.append(vertical_line);

            const task_tools = document.createElement("div");
            task_tools.setAttribute("id", "task--tools");

            task_tools_container.append(task_tools);

            const task_date_container = document.createElement("div");
            task_date_container.classList.add("todo__date");
            task_date_container.setAttribute("contenteditable", false);

            task_tools.append(task_date_container);

            const task_date_output = document.createElement("p");
            task_date_output.setAttribute("id", "task--date");
            task_date_output.innerHTML = task_date;

            task_date_container.append(task_date_output);

            const icon_container = document.createElement("div");
            icon_container.classList.add("icons");

            task_tools.append(icon_container);

            const icon_done = document.createElement("i");
            icon_done.setAttribute("id", "taskDone");
            icon_done.classList.add(
              "task--done",
              "fa-solid",
              "fa-chevron-down",
              'fa-2xl"'
            );

            const icon_edit = document.createElement("i");
            icon_edit.setAttribute("id", "taskEdit");
            icon_edit.classList.add(
              "task--edit",
              "fa-regular",
              "fa-keyboard",
              'fa-2xl"'
            );

            const icon_delete = document.createElement("i");
            icon_delete.setAttribute("id", "taskDelete");
            icon_delete.classList.add(
              "task--delete",
              "fa-regular",
              "fa-trash-can",
              'fa-xl"'
            );

            icon_container.append(icon_done);
            icon_container.append(icon_edit);
            icon_container.append(icon_delete);
          }
        });
    } else {
      console.error("Error on loading data", error);
    }
  });
};

showTaskToBeDone();

function taskDone() {
  console.log("done");
}

function taskEdit() {
  console.log("edit");
}

function taskDelete() {
  console.log("delete");
}

const logout = () => {
  auth
    .signOut()
    .then(() => {
      localStorage.removeItem("userEmail");
      alert("User log out");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login error:", errorCode, errorMessage);
    });
};

logoutBtn.addEventListener("click", logout);

window.addEventListener("load", function () {
  this.setTimeout(() => {
    addTodoBtn.addEventListener("click", addTodo);
    taskDoneBtn.addEventListener("click", taskDone);
    taskEditBtn.addEventListener("click", taskEdit);
    taskDeleteBtn.addEventListener("click", taskDelete);
  }, 4000);
});
