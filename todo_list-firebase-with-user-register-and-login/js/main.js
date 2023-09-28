const firebaseConfig = {
  apiKey: "AIzaSyDJAxPc4o4ioF30wg4E5bFtU5OimFC50_U",
  authDomain: "js-exercises-todo.firebaseapp.com",
  databaseURL: "https://js-exercises-todo-default-rtdb.firebaseio.com",
  projectId: "js-exercises-todo",
  storageBucket: "js-exercises-todo.appspot.com",
  messagingSenderId: "332822760574",
  appId: "1:332822760574:web:6cc3d73904d36b5b719c2f",
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

const logInMain = document.querySelector(".login__container");
const signInBtn = document.getElementById("btnSignUp");
const logInBtn = document.getElementById("btnLogin");
const spacerLine = document.querySelector(".spacer__line");
const loginSignupQuestion = document.querySelector(".login__signup");
const toggleChoice = document.querySelector(".toggle__login__signup");

const email = document.getElementById("emailInput");
const username = document.getElementById("userName");
const password = document.getElementById("passwordInput");
const passwordRepete = document.getElementById("passwordInputRepete");

const register = () => {
  const email = document.getElementById("emailInput").value;
  const username = document.getElementById("userName").value;
  const password = document.getElementById("passwordInput").value;
  const passwordRepete = document.getElementById("passwordInputRepete").value;

  if (validateEmail(email) == false) {
    alert("Nieprawidlowy adres email");
    return;
  }
  if (validatePasswordSignin(password, passwordRepete) == false) {
    alert("Nieprawdłowe hasło lub hasła się nie zgadzaja");
    return;
  }
  if (validateUsername(username) == false) {
    alert("Za krótka nazawa uzytkownika");
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      const user = auth.currentUser;
      const databaseRef = database.ref();

      const userData = {
        email: email,
        username: username,
        lastLogin: new Date(),
      };

      databaseRef.child("users/" + user.uid).set(userData);
      alert("User created");
      toggleLoginSignup();
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
};

const login = () => {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;  

  if (validateEmail(email) == false) {
    alert("Nieprawidlowy email");
    return;
  }
  if (validatePasswordLogin(password) == false) {
    alert("Nieprawidłowe hasło");
    return
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      const user = auth.currentUser;
      const databaseRef = database.ref();

      const userData = {
        lastLogin: new Date(),
      };

      databaseRef.child("users/" + user.uid).update(userData);

      localStorage.setItem("userEmail", JSON.stringify(email))

      alert(`user log in`);

      window.location.href = "./html/todo.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login error:", errorCode, errorMessage);
    });
};

const toggleLoginSignup = () => {
  if (toggleChoice.textContent === "SignUp") {
    showLoginShowSignup();
    loginSignupQuestion.value = "Already have an account?";
    toggleChoice.textContent = "LogIn";
  } else {
    showLoginShowSignup();
    loginSignupQuestion.value = "Don't have an account?";
    toggleChoice.textContent = "SignUp";
  }
};

const showLoginShowSignup = () => {
  username.classList.toggle("hiden");
  passwordRepete.classList.toggle("hiden");
  logInBtn.classList.toggle("hiden");
  signInBtn.classList.toggle("hiden");
};

const validateEmail = (email) => {
  const regex = /^[^@]+@\w+(\.\w+)+\w$/;

  if (regex.test(email) == true) {
    return true;
  } else {
    return false;
  }
};

const validatePasswordSignin = (password, passwordRepete) => {
  if (password.length < 9 || passwordRepete !== password) {
    return false;
  } else {
    return true;
  }
};

const validatePasswordLogin = (password) => {
  if (password.length < 9) {
    return false;
  } else {
    return true;
  }
};

const validateUsername = (username) => {
  const regex = /^[A-Za-z][A-Za-z0-9_]{5,29}$/;

  if (regex.test(username) == true) {
    return true;
  } else {
    return false;
  }
};

toggleChoice.addEventListener("click", toggleLoginSignup);
signInBtn.addEventListener("click", register);
logInBtn.addEventListener("click", login);

