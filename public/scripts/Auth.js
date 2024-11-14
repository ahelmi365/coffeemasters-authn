import API from "./API.js";
import Router from "./Router.js";

const Auth = {
  isLoggedIn: false,
  account: null,
  login: async (event) => {
    event.preventDefault();
    const formLogin = document.getElementById("formLogin");
    const formData = new FormData(formLogin);
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await API.login(credentials);
    Auth.postLogin(response, { ...credentials, name: response.user.name });
  },
  register: async (event) => {
    event.preventDefault();
    const formRegister = document.getElementById("formRegister");
    const formData = new FormData(formRegister);
    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const response = await API.register(user);
    Auth.postLogin(response, user);
  },

  postLogin: async (response, user) => {
    if (response.ok) {
      Auth.isLoggedIn = true;
      Auth.account = user;
      Auth.updateStatus();
      Router.go("/account");
    } else {
      alert(response.message);
    }
  },
  updateStatus() {
    if (Auth.isLoggedIn && Auth.account) {
      document
        .querySelectorAll(".logged_out")
        .forEach((e) => (e.style.display = "none"));
      document
        .querySelectorAll(".logged_in")
        .forEach((e) => (e.style.display = "block"));
      document
        .querySelectorAll(".account_name")
        .forEach((e) => (e.innerHTML = Auth.account.name));
      document
        .querySelectorAll(".account_username")
        .forEach((e) => (e.innerHTML = Auth.account.email));
    } else {
      console.log("else in update ");
      document
        .querySelectorAll(".logged_out")
        .forEach((e) => (e.style.display = "block"));
      document
        .querySelectorAll(".logged_in")
        .forEach((e) => (e.style.display = "none"));
    }
  },
  init: () => {},
  logout: () => {
    Auth.isLoggedIn = false;
    Auth.account = null;
    Auth.updateStatus();
    Router.go("/");
  },
};
Auth.updateStatus();

export default Auth;

// make it a global object
window.Auth = Auth;
