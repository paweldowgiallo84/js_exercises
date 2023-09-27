const firebaseConfig = {
  apiKey: "AIzaSyDJAxPc4o4ioF30wg4E5bFtU5OimFC50_U",
  authDomain: "js-exercises-todo.firebaseapp.com",
  databaseURL: "https://js-exercises-todo-default-rtdb.firebaseio.com",
  projectId: "js-exercises-todo",
  storageBucket: "js-exercises-todo.appspot.com",
  messagingSenderId: "332822760574",
  appId: "1:332822760574:web:6cc3d73904d36b5b719c2f",
};

let key;

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

const user = document.querySelector(".user");
const userEmail = JSON.parse(localStorage.getItem("userEmail"));
const testInput = document.querySelector(".input__test");
const testBtn = document.querySelector(".button__test");

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

addTodoBtn.addEventListener("click", addTodo);
taskDoneBtn.addEventListener("click", taskDone);
taskEditBtn.addEventListener("click", taskEdit);
taskDeleteBtn.addEventListener("click", taskDelete);

function addTodo() {
  const todoInput = document.getElementById("todo__input");
  const dateInput = document.getElementById("todo__date");

  if (todoInput.value.length != 0 && dateInput.value.length != 0) {
    const user = auth.currentUser;

    const userData = {
      lastLogin: new Date(),
      unfinished_task: {
        task: todoInput.value,
        date: dateInput.value,
      },
    };

    // database.child("users/" + user.uid).update(userData);
    const userRef = database.ref("users/" + user.uid);

    userRef
      .update(userData)
      .then(() => {
        console.log("dane wyslane");
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login error:", errorCode, errorMessage);
      });
  }
}

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
