import DetailService from "../../service/detail";

const state = {
  tag: "",
  pre_tags: []
};
const getters = {
  tag: () => state.tag,
  pre_tags: () => state.pre_tags
};
const actions = {
  preTags({ commit }, val) {
      // tags是正在输入的标签,用空格判断是否输入完一个标签
      const tags = val.split(" ")
      if (tags.length > 1) {  // 已经输入完一个标签
        commit("addPreTag", tags[0]); // 加入标签列表
        commit("clearTag"); // 清空现在正在输入的标签内容
      } else {
        commit("typingTag", tags); // 正在输入标签
      }
  },
  deleteTag({ commit }) {
    if (state.tag.length == 0 && state.pre_tags.length > 0) {
      commit("deleteTag");
    }
  },
  submitComment(context, body) {
    DetailService.newComment(
      body.course_id,
      body.token,
      body.comment_text
    ).then(() => {
      window.location.href = "/course/" + body.course_id;
    });
  }
};
const mutations = {
  addPreTag(state, tag) {
    if (state.pre_tags.indexOf(tag) == -1) {
      state.pre_tags.push(tag);
    }
  },
  clearTag(state) {
    state.tag = "";
  },
  typingTag(state, tags) {
    state.tag = tags + "";
  },
  deleteTag(state) {
    state.pre_tags.pop();
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
