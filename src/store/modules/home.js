import HomeService from "../../service/home";

const state = {
  tips: ""
};
const getters = {
  tips: () => state.tips
};
const actions = {
  fetchData({ commit }) {
    commit("fetchData");
  }
};
const mutations = {
  fetchData(state) {
    HomeService.getTips().then(json => {
      const arr = json.reverse();
      const last = arr.splice(arr.length - 1, 1)[0];
      arr.splice(1, 0, last);
      state.tips = arr;
    });
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
