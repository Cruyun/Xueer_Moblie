import DetailService from "../../service/detail";
import FetchData from "../../service/fetch";
import State from "../state";
const state = {
  loading: true,
  info: {},
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
    commit("initPage");
    commit("setId", id);
    Promise.all([
      DetailService.getInfo(state.course_id, State.token),
      DetailService.getComments(state.course_id, state.page, State.token),
      DetailService.getHotComments(state.course_id, State.token)
    ]).then(value => {
      preprocess(value[1]);
      preprocess(value[2]);
      commit("setInfo", value[0]);
      commit("setComments", value[1]);
      commit("setHotComments", value[2]);
      commit("setLoading", false);
    });
  },
  fetchMoreComments({ commit }) {
    commit("addPage");
    DetailService.getComments(state.course_id, state.page).then(json => {
      preprocess(json);
      commit("setMoreComments", json);
    });
  },
  courseLike({ commit }) {
    // 课程点赞
    commit("setCourseLiked", true);
    commit("setCourseLikes", state.info.likes + 1);
    DetailService.likeCourse(state.info.id, State.token);
  },
  courseDisLike({ commit }) {
    // 取消点赞
    commit("setCourseLiked", false);
    commit("setCourseLikes", state.info.likes - 1);
    DetailService.DelLikeCourse(state.info.id, State.token);
  },
  commentsLike({ commit }, comment) {
    // 评论点赞
    if (
      state.comments[comment.index] &&
      state.comments[comment.index].id == comment.id
    ) {
      // 普通评论
      commit("setCommentsLiked", { index: comment.index, liked: true });
      commit("setCommentsLikes", {
        index: comment.index,
        likes: state.comments[comment.index].likes + 1
      });
    } else {
      // 热门评论
      commit("setHotCommentsLiked", { index: comment.index, liked: true });
      commit("setHotCommentsLikes", {
        index: comment.index,
        likes: state.hot_comments[comment.index].likes + 1
      });
    }
    DetailService.likeComment(comment.id, State.token);
  },
  commentsDisLike({ commit }, comment) {
    // 取消评论点赞
    if (
      state.comments[comment.index] &&
      state.comments[comment.index].id == comment.id
    ) {
      // 普通评论
      commit("setCommentsLiked", { index: comment.index, liked: false });
      commit("setCommentsLikes", {
        index: comment.index,
        likes: state.comments[comment.index].likes - 1
      });
    } else {
      // 热门评论
      commit("setHotCommentsLiked", { index: comment.index, liked: false });
      commit("setHotCommentsLikes", {
        index: comment.index,
        likes: state.hot_comments[comment.index].likes - 1
      });
    }
    DetailService.DelLikeComment(comment.id, State.token);
  }
};
const mutations = {
  initPage(state) {
    state.page = 1;
    state.loading = true;
  },
  setLoading(state, loading) {
    state.loading = loading;
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
  },
  setCourseLiked(state, liked) {
    // 修改是否喜欢课程的状态
    state.info.liked = liked;
  },
  setCourseLikes(state, likes) {
    // 修改喜欢课程的人数
    state.info.likes = likes;
  },
  setCommentsLiked(state, comment) {
    // 修改喜欢评论的状态
    state.comments[comment.index].liked = comment.liked;
  },
  setCommentsLikes(state, comment) {
    // 修改喜欢评论的人数
    state.comments[comment.index].likes = comment.likes;
  },
  setHotCommentsLiked(state, comment) {
    state.hot_comments[comment.index].liked = comment.liked;
    // console.log(state.hot_comments[comment.index].liked);
  },
  setHotCommentsLikes(state, comment) {
    state.hot_comments[comment.index].likes = comment.likes;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
