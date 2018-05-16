import SubjectService from "../../service/subject";

const state = {
  sub_info: {}
};
const getters = {
  sub_info: () => state.sub_info
};
const actions = {
  fetchSubject({ commit }, id) {
    SubjectService.oneTip(id).then(json => {
      commit("fetchSubject", json);
    });
  },
  likeThis({ commit }) {
    commit("likeThis");
  }
};
const mutations = {
  fetchSubject(state, json) {
    state.sub_info = json;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
