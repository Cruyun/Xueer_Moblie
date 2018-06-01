import Fetch from "./fetch.js";

const SubjectService = {
  oneTip(id) {
    return Fetch("/api/v1.0/tips/" + id + "/");
  }
};

export default SubjectService;
