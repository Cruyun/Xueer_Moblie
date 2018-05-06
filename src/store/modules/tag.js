import TagService from "../../service/tag";
const state = {
  hot_tag: []
};
const getters = {
  hot_tag: () => state.hot_tag
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
  }
};
const mutations = {
  getTags(state, title) {
    state.hot_tag.push(title);
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
