import Fetch from "./fetch.js";

let SearchService = {
  getHot() {
    return Fetch("/api/v1.0/search/hot/");
  },
  // searchCourse(info) {
  //   return Fetch("/api/v1.0/search/?page=1&per_page=20&keywords=" + info);
  // },
  searchCourse(params) {
    return Fetch("/api/v1.0/search", {
      data: params,
      responseHeaders: ["link"]
    });
  },
  searchRes(page, keyword) {
    return Fetch(
      "/api/v1.0/search/?page=" + page + "&per_page=20&keywords=" + keyword
    );
  }
};
export default SearchService;
