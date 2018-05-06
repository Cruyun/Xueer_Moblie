import Fetch from "./fetch.js";

let SignService = {
  getEmail() {
    return window.location.href
      .split("?")[1]
      .split("&")[0]
      .split("=")[1];
  },
  getUsername(email) {
    return Fetch("https://user.muxixyz.com/api/user/?email=" + email, {
      method: "GET"
    });
  },
  getToken(email) {
    return Fetch("/api/v1.0/token/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(email + ":muxi304")
      }
    });
  },
  register(username, email) {
    return Fetch("/api/v1.0/users/", {
      method: "POST",
      data: {
        username: username,
        email: email,
        password: "muxi304",
        roleid: 3
      }
    });
  }
};
export default SignService;
