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
const selectLoginSignUp = document.getElementById("selectLoginSignUp");
const selectLoginBtn = document.getElementById("btnLoginSelect");
const selectSignUpBtn = document.getElementById("btnSignUpSelect");
const signInBtn = document.getElementById("btnSignUp");
const logInBtn = document.getElementById("btnLogin");
const loOutBtn = document.getElementById("btnLogOut");
const spacerLine = document.querySelector(".spacer__line");

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

  if (
    validateEmail(email) == false ||
    validatePasswordLogin(password) == false
  ) {
    alert("Nieprawidlowy email lub hasło");
    return;
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

      alert("user log in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login error:", errorCode, errorMessage);
    });
};

const logout = () => {
  auth
    .signOut()
    .then(() => {
      alert("User log out");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login error:", errorCode, errorMessage);
    });
};

const selectLogIn = () => {
  if (selectLoginBtn.getAttribute("selected") === "select") {
    showLogInInputs();
    selectLoginBtn.removeAttribute("selected");
    return;
  }
  if (selectSignUpBtn.getAttribute("selected") === "select") {
    showSignInInputs();
    selectSignUpBtn.removeAttribute("selected");
    showLogInInputs();
    selectLoginBtn.setAttribute("selected", "select");
    return;
  } else {
    showLogInInputs();
    selectLoginBtn.setAttribute("selected", "select");
  }
};

const selectSignUp = () => {
  if (selectSignUpBtn.getAttribute("selected" === "select")) {
    showSignInInputs();
    selectSignUpBtn.removeAttribute("selected");
    return;
  }
  if (selectLoginBtn.getAttribute("selected") === "select") {
    showLogInInputs();
    selectLoginBtn.removeAttribute("selected");
    showSignInInputs();
    selectSignUpBtn.setAttribute("selected", "select");
    return;
  } else {
    showSignInInputs();
    selectSignUpBtn.setAttribute("selected", "select");
  }
};

const showLogInInputs = () => {
  email.classList.toggle("hiden");
  password.classList.toggle("hiden");
  spacerLine.classList.toggle("hiden");
  signInBtn.closest(".login__btns").classList.toggle("hiden");
  logInBtn.classList.toggle("hiden");
};

const showSignInInputs = () => {
  email.classList.toggle("hiden");
  username.classList.toggle("hiden");
  password.classList.toggle("hiden");
  passwordRepete.classList.toggle("hiden");
  spacerLine.classList.toggle("hiden");
  signInBtn.closest(".login__btns").classList.toggle("hiden");
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

selectLoginBtn.addEventListener("click", selectLogIn);
selectSignUpBtn.addEventListener("click", selectSignUp);
signInBtn.addEventListener("click", register);
logInBtn.addEventListener("click", login);
loOutBtn.addEventListener("click", logout);
