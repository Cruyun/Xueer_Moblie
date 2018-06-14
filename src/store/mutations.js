const mutations = {
  changeCurrentRoute(state, path) {
    state.currentRoute = path;
  },
  isLoading(state, flag) {
    state.is_loading = flag;
  },
  showSelector(state, flag) {
    state.is_selected = flag;
  },
  showLogin(state, flag) {
    state.is_logined ? "" : (state.show_login = flag);
  },
  initData(state, data) {
    state[data] = "";
  },
  setToken(state, token) {
    state.token = token;
  },
  isLogin(state) {
    state.is_logined = true;
  },
  clearUserData(state) {
    state.token = "";
    state.is_logined = false;
  },
  setRecommender(state, id) {
    state.recommender = id;
  }
};

export default mutations;
