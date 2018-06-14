import Fetch from "./fetch.js";

const UserService = {
  getCurrentUserInfo({ token }) {
    return Fetch("/api/v1.0/user/mine/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa(token + ":")
      }
    });
  },
  getPromotionLink({ token }) {
    return Fetch("/api/v1.0/promotion/private-promotion-link/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa(token + ":")
      }
    });
  }
};

export default UserService;
