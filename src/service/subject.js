import Fetch from "./fetch.js";

const SubjectService = {
  oneTip(id) {
    return Fetch("/api/v1.0/tips/" + id + "/");
  },
  likeTip(id, token) {
    return Fetch("/api/v1.0/tip/" + id + "/like/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa(token + ":")
      }
    });
  },
  cancelLike(id, token) {
    return Fetch("/api/v1.0/tip/" + id + "/like/", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + window.btoa(token + ":")
      }
    });
  }
};

export default SubjectService;
