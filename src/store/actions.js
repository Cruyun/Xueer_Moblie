import SignService from '../service/sign';
import Cookie from '../service/cookie';

const actions = {
  changePageFlagN({ commit }, flag) {
    commit("changePageFlagN", flag);
  },
  changePageFlagY({ commit }, flag) {
    commit("changePageFlagY", flag);
  },
  getSnaps({ commit }, snaps) {
    commit("getSnaps", snaps);
  },
  isLoading({ commit }, flag) {
    commit("isLoading", flag);
  },
  showSelector({ commit }, flag) {
    commit("showSelector", flag);
  },
  showLogin({ commit }, flag) {
    commit("showLogin", flag);
  },
  initData({ commit }, data) {
    commit("initData", data);
  },
  getToken({ commit }) {
    let email = SignService.getEmail();
    SignService.getToken(email).then(res => {
      if (res !== null && res !== undefined){
        commit("getToken", res.token);
        commit("isLogin");
        commit("isLoading", false);
        window.location.href = Cookie.getCookie("url");
      } else {
        SignService.getUsername(email).then(info => {
          SignService.register(info.username, email).then(res => {
            SignService.getToken(email).then(res => {
              commit("getToken", res.token);
              commit("isLogin");
              commit("isLoading", false);
              window.location.href = Cookie.getCookie("url");
            })
          })
        })  
      }
    })
  }
};

export default actions;
