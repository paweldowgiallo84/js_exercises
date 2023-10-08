const firebaseConfig = {
  apiKey: "AIzaSyDJAxPc4o4ioF30wg4E5bFtU5OimFC50_U",
  authDomain: "js-exercises-todo.firebaseapp.com",
  databaseURL: "https://js-exercises-todo-default-rtdb.firebaseio.com",
  projectId: "js-exercises-todo",
  storageBucket: "js-exercises-todo.appspot.com",
  messagingSenderId: "332822760574",
  appId: "1:332822760574:web:6cc3d73904d36b5b719c2f",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

// const user = document.querySelector(".user");
const userEmail = JSON.parse(localStorage.getItem("userEmail"));
const testInput = document.querySelector(".input__test");
const taskDate = document.getElementById("task--date");
const taskDescription = document.getElementById("task--desctiption");
const todoToComplete = document.getElementsByClassName("task__container")[0];
const finishedTodo = document.getElementsByClassName("task__container")[1];

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
            icon_done.setAttribute("key", task_key);
            icon_done.classList.add(
              "task--done",
              "fa-solid",
              "fa-chevron-down",
              'fa-2xl"'
            );

            const icon_edit = document.createElement("i");
            icon_edit.setAttribute("id", "taskEdit");
            icon_edit.setAttribute("key", task_key);
            icon_edit.classList.add(
              "task--edit",
              "fa-regular",
              "fa-keyboard",
              'fa-2xl"'
            );

            const icon_delete = document.createElement("i");
            icon_delete.setAttribute("id", "taskDelete");
            icon_delete.setAttribute("key", task_key);
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

const showFinishedTasks = () => {
  finishedTodo.innerHTML = "";

  var user = auth.currentUser;

  auth.onAuthStateChanged((user) => {
    if (user) {
      const taskDoneArray = [];
      database
        .ref("users/" + user.uid + "/finished_task")
        .on("value", (snapshot) => {
          snapshot.forEach((childShapshot) => {
            const childData = childShapshot.val();
            taskDoneArray.push(Object.values(childData));
          });

          for (let i = 0; i < taskDoneArray.length; i++) {
            const task_date = taskDoneArray[i][0];
            const task_key = taskDoneArray[i][1];
            const task_Description = taskDoneArray[i][2];

            const task_container = document.createElement("div");
            task_container.setAttribute("id", "task");
            task_container.setAttribute("key", task_key);

            finishedTodo.append(task_container);

            const single_task_description = document.createElement("p");
            single_task_description.setAttribute("id", "task--desctiption");
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
            task_date_container.classList.add(
              "todo__date",
              "todo__date--no__cursor"
            );

            task_tools.append(task_date_container);

            const task_date_output = document.createElement("p");
            task_date_output.setAttribute("id", "task--finish__date");
            task_date_output.innerHTML = task_date;

            task_date_container.append(task_date_output);
          }
        });
    } else {
      console.error("Error on loading data", error);
    }
  });
};

function taskDone(target) {
  const tascCompletedTitle = target.closest("#task").firstChild.innerHTML;
  const taskCompletedDate = currentDate();

  var user = auth.currentUser;
  const todoKey = target.getAttribute("key");

  if (user) {
    const completedTodo = {
      [todoKey]: {
        date: taskCompletedDate,
        task: tascCompletedTitle,
        key: todoKey,
      },
    };

    const todoToRemove = {
      [todoKey]: null,
    };

    const userRef = database.ref("users/" + user.uid + "/finished_task");
    const userRefRemove = database.ref(
      "users/" + user.uid + "/unfinished_task"
    );

    userRef
      .update(completedTodo)
      .then(() => {
        userRefRemove
          .update(todoToRemove)
          .then(() => {
            // console.log("task moved to finished task");
          })

          .catch((error) => {
            console.error("Error while updating user data", error);
          });
        showTaskToBeDone();
        showFinishedTasks();
      })
      .catch((error) => {
        console.error("Error while updating user data", error);
      });
  } else {
    console.error("User is not authenticated");
  }
}

function taskEdit(target) {
  const taskToEdit = target.closest("#task");
  const key = taskToEdit.getAttribute("key");

  const taskToChangeCount = taskToEdit.parentElement.querySelectorAll(
    "#input__edit__container"
  );

  if (taskToChangeCount.length >= 1) return;
  else {
    const inputEditContainer = document.createElement("div");
    inputEditContainer.setAttribute("id", "input__edit__container");
    inputEditContainer.setAttribute("key", key);

    taskToEdit.append(inputEditContainer);

    const inputEdit = document.createElement("input");
    const inputDateEdit = document.createElement("input");

    inputEdit.type = "text";
    inputDateEdit.type = "date";

    inputEdit.classList.add("todo__edit__input");
    inputDateEdit.classList.add("todo__edit__date");

    inputEdit.value = taskToEdit.firstChild.innerHTML;
    inputDateEdit.value = taskToEdit.children
      .item(1)
      .children.item(1).firstChild.firstChild.innerHTML;

    inputEditContainer.append(inputEdit);
    inputEditContainer.append(inputDateEdit);

    const submitEdit = document.createElement("button");
    const cancelEdit = document.createElement("button");

    submitEdit.setAttribute("id", "submit__edit");
    submitEdit.setAttribute("key", key);

    cancelEdit.setAttribute("id", "cancel__edit");
    cancelEdit.setAttribute("key", key);

    submitEdit.textContent = "EDIT";
    cancelEdit.textContent = "CANCEL EDIT";

    inputEditContainer.append(submitEdit);
    inputEditContainer.append(cancelEdit);

    const cancelBtn = document.getElementById("cancel__edit");
    const submitBtn = document.getElementById("submit__edit");

    cancelBtn.addEventListener("click", (e) => {
      inputEditContainer.remove("div");
    });

    submitBtn.addEventListener("click", (e) => {
      const taskAfterChange = e.target.closest(
        "#input__edit__container"
      ).firstChild;

      const taskDateAfterChange = e.target
        .closest("#input__edit__container")
        .children.item(1);

      if (
        taskAfterChange.value.length != 0 &&
        taskDateAfterChange.value.length != 0
      ) {
        var user = auth.currentUser;

        if (user) {
          const userData = {
            [key]: {
              date: taskDateAfterChange.value,
              task: taskAfterChange.value,
              key: key,
            },
          };

          const userRef = database.ref(
            "users/" + user.uid + "/unfinished_task"
          );

          userRef
            .update(userData)
            .then(() => {
              inputEditContainer.remove("div");
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
    });
  }
}

function taskDelete(target) {
  var user = auth.currentUser;
  const taskKey = target.getAttribute("key");

  if (user) {
    const userData = {
      [taskKey]: null,
    };

    const userRef = database.ref("users/" + user.uid + "/unfinished_task");

    userRef
      .update(userData)
      .then(() => {
        // console.log("Todo has been removed");
      })

      .catch((error) => {
        console.error("Error while removing user data", error);
      });
    showTaskToBeDone();
  } else {
    console.error("User is not authenticated");
  }
}

todoToComplete.addEventListener("click", function (event) {
  const target = event.target;

  if (target.id === "taskDone") {
    taskDone(target);
  } else if (target.id === "taskEdit") {
    taskEdit(target);
  } else if (target.id === "taskDelete") {
    taskDelete(target);
  } 
});

function currentDate() {
  const newDate = new Date();
  const currentYear = newDate.getUTCFullYear();
  const currentMonth =
    newDate.getUTCMonth() + 1 < 10
      ? "0" + (newDate.getUTCMonth() + 1)
      : newDate.getUTCMonth() + 1;
  const currentDay =
    newDate.getUTCDate() < 10
      ? "0" + newDate.getUTCDate()
      : newDate.getUTCDate();

  const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
  return currentDate;
}

const logout = () => {
  auth
    .signOut()
    .then(() => {
      localStorage.removeItem("userEmail");
      alert("User log out");
      window.location.href = "../index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login error:", errorCode, errorMessage);
    });
};

const runOnceOnPageLoad = (function () {
  let hasRun = false;

  return function () {
    if (!hasRun) {
      showTaskToBeDone();
      showFinishedTasks();
      hasRun = true;
    }
  };
})();

runOnceOnPageLoad();

addTodoBtn.addEventListener("click", addTodo);
logoutBtn.addEventListener("click", logout);
