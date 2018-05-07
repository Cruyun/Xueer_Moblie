import Fetch from "./fetch.js";

const DetailService = {
  like(id, body, token) {
    return Fetch("/api/v1.0/" + id +"/courses/like/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(token + ":")
      },
      data: body
    });
  },
  getInfo(id) {
    return Fetch("/api/v1.0/courses/" + id + "/");
  },
  getComments(id, page) {
    return Fetch(
      "/api/v1.0/courses/" + id + "/comments/?page=" + page + "&per_page=10"
    );
  },
  getHotComments(id) {
    return Fetch("/api/v1.0/courses/" + id + "/comments/hot/");
  },
  likeCourse(id, token) {
    return Fetch("/api/v1.0/courses/" + id + "/like/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(token + ":")
      }
    });
  },
  likeComment(id, token) {
    return Fetch("/api/v1.0/comments/" + id + "/like/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(token + ":")
      }
    });
  },
  newComment(id, token, text) {
    return Fetch("/api/v1.0/courses/" + id + "/comments/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(token + ":")
      },
      data: {
        body: text
      }
    })
  }
};

export default DetailService;
