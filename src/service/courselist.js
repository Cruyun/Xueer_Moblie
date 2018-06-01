import Fetch from "./fetch.js";

const CoursesListService = {
  viewCourse(page) {
    return Fetch("api/v1.0/courses/?sort=view&page=" + page);
  },
  viewSearch(page, txt) {
    return Fetch(
      "/api/v1.0/search/?page=" +
        page +
        "&per_page=20&keywords=" +
        txt +
        "&sort=view"
    );
  },
  getCoursesList(params) {
    return Fetch("api/v1.0/courses", {
      data: params,
      responseHeaders: ["link"]
    });
  },
  getNextCoursesList(params) {
    return Fetch("api/v1.0/courses", {
      data: params
    });
  }
};

export default CoursesListService;
