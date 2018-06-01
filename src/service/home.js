import Fetch from "./fetch.js";

const HomeService = {
  getTips() {
    return Fetch("/api/v1.0/tips/");
  }
};
export default HomeService;
