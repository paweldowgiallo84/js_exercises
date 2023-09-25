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

const signInBtn = document.getElementById("btnSignUp");
const logInBtn = document.getElementById("btnLogin");
const loOutBtn = document.getElementById("btnLogOut");

const register = () => {
  const email = document.getElementById("emailInput").value;
  const username = document.getElementById("userName").value;
  const password = document.getElementById("passwordInput").value;
  const passwordRepete = document.getElementById("passwordInputRepete").value;

  if (
    validateEmail(email) == false ||
    validatePasswordSignin(password, passwordRepete) == false
  ) {
    alert("Nieprawidlowy email lub hasło");
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

signInBtn.addEventListener("click", register);
logInBtn.addEventListener("click", login);
loOutBtn.addEventListener("click", logout);
