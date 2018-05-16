import TagService from "../../service/tag";
const state = {
  hot_tag: [],
  tag_exist: false
};
const getters = {
  hot_tag: () => state.hot_tag,
  tag_exist: () => state.tag_exist
};
const actions = {
  getTags({ commit }) {
    TagService.getTags().then(json => {
      if (json !== "" || json !== null || json != undefined) {
        for (let i = 0; i < json.length; i++) {
          commit("getTags", json[i].title);
        }
      }
    });
    commit("existTags")
  }
};
const mutations = {
  getTags(state, title) {
    state.hot_tag.push(title)
  },
  existTags(state) {
    state.tag_exist = true
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
