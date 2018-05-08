import DetailService from "../../service/detail";
import FetchData from "../../service/fetch";
const state = {
  info: {},
  hot_tags: [],
  comments: [],
  hot_comments: [],
  page: 1,
  course_id: ""
};
const getters = {
  info: () => state.info,
  hot_tags: () => {
    let hot_tags;
    state.info.hot_tags
      ? (hot_tags = state.info.hot_tags.split(" "))
      : (hot_tags = []);
    return hot_tags;
  },
  comments: () => state.comments,
  hot_comments: () => state.hot_comments,
  more: () => {
    if (state.comments.length == 0) {
      return false;
    }
    if (state.comments.length >= state.info.views) {
      return false;
    }
    return true;
  },
  loctime: () => {
    return state.info.loctime ? state.info.loctime.split(",") : "";
  }
};

const preprocess = json => {
  json.forEach(element => {
    if (element.body.length >= 60) {
      element._body = element.body;
      element.body = element.body.substr(0, 60);
    }
  });
  return json;
};

const actions = {
  fetchAll({ commit }, id) {
    commit("initAll");
    commit("setId", id);
    Promise.all([
      DetailService.getInfo(state.course_id),
      DetailService.getComments(state.course_id, state.page),
      DetailService.getHotComments(state.course_id)
    ]).then(value => {
      preprocess(value[1]);
      preprocess(value[2]);
      commit("setInfo", value[0]);
      commit("setComments", value[1]);
      commit("setHotComments", value[2]);
    });
  },
  fetchMoreComments({ commit }) {
    commit("addPage");
    DetailService.getComments(state.course_id, state.page).then(json => {
      preprocess(json);
      commit("setMoreComments", json);
    });
  },
  courseLike({ commit }) {}
};
const mutations = {
  initAll(state) {
    state.info = {};
    state.hot_tags = [];
    state.comments = [];
    state.hot_comments = [];
    state.page = 1;
    state.course_id = "";
  },
  setId(state, id) {
    state.course_id = id;
  },
  setInfo(state, info) {
    state.info = info;
  },
  addPage(state) {
    state.page++;
  },
  setMoreComments(state, comments) {
    state.comments = state.comments.concat(comments);
  },
  setComments(state, comments) {
    state.comments = comments;
  },
  setHotComments(state, hot_comments) {
    state.hot_comments = hot_comments;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
