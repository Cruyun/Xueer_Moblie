import { SignService } from "../service/sign";

const mutations = {
  changeCurrentRoute(state, path) {
    state.currentRoute = path;
  },
  changePageFlagN(state, flag) {
    if (Object.prototype.toString.call(flag) === "[object String]") {
      state[flag] = false;
    } else if (Object.prototype.toString.call(flag) === "[object Array]") {
      flag.forEach(element => {
        state[element] = false;
      });
    }
  },
  changePageFlagY(state, flag) {
    if (Object.prototype.toString.call(flag) === "[object String]") {
      state[flag] = true;
    } else if (Object.prototype.toString.call(flag) === "[object Array]") {
      flag.forEach(element => {
        state[element] = true;
      });
    }
  },
  getSnaps(state, snaps) {
    for (const key in snaps) {
      state.page_snaps[key] = snaps[key];
    }
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
  getToken(state, token) {
    SignService.getToken().then(res => {
      state.token = res.token;
    });
  }
};

export default mutations;
