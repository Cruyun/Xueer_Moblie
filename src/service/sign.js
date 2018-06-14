import Fetch from "./fetch.js";

const SignService = {
  getEmail() {
    return window.location.href
      .split("?")[1]
      .split("&")[0]
      .split("=")[1];
  },
  getUsername(email) {
    return Fetch(
      "https://user.muxixyz.com/api/user/?email=" + decodeURIComponent(email),
      {
        method: "GET"
      }
    );
  },
  getToken(email) {
    return Fetch("/api/v1.0/token/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Basic " + window.btoa(decodeURIComponent(email) + ":muxi304")
      }
    });
  },
  register(username, email, recommender_id) {
    return Fetch("/api/v1.0/register/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        username: decodeURIComponent(username),
        email: decodeURIComponent(email),
        password: "bXV4aTMwNA==", // btoa(muxi304)
        roleid: 3,
        recommender_id,
        qq: "",
        major: "",
        phone: "",
        school: ""
      }
    });
  }
};
export default SignService;
