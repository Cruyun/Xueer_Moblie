import Fetch from "./fetch.js";

const TagService = {
  getTags() {
    return Fetch("/api/v1.0/tags/");
  }
};

export default TagService;
