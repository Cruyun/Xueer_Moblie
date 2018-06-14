import SubjectService from "../../service/subject";
import State from "../state";

const state = {
  sub_info: {
    author: ""
  }
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
<<<<<<< HEAD
  likeTip({ state, commit }, id) {
   SubjectService.likeTip(state.sub_info.id, State.token).then(res => {
     commit("setLike", true)
   })
  },
  cancelLike({ state, commit }, id) {
    SubjectService.cancelLike(state.sub_info.id, State.token).then(res => {
      commit("setLike", false)
    })
=======
  likeTip({ state, commit }) {
    SubjectService.likeTip(state.sub_info.id, State.token).then(() => {
      commit("setLike", true);
    });
  },
  cancelLike({ state, commit }) {
    SubjectService.cancelLike(state.sub_info.id, State.token).then(() => {
      commit("setLike", false);
    });
>>>>>>> b4c48093fdcd9f9dcb97796b99f6c60a2bf52982
  }
};
const mutations = {
  fetchSubject(state, json) {
    state.sub_info = json;
  },
  setLike(state, flag) {
    state.sub_info.liked = flag;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
