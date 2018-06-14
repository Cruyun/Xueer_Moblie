import SignService from "../service/sign";
import Cookie from "../service/cookie";

const actions = {
  changeCurrentRoute({ commit }, path) {
    commit("changeCurrentRoute", path);
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
  logout({ commit }) {
    Cookie.clearCookie("token");
    commit("clearUserData");
  },
  setRecommender({ commit }, id) {
    Cookie.setCookie("recommender_id", id);
    commit("setRecommender", id);
  },
  getToken({ commit }) {
    const email = SignService.getEmail();
    let redirectURL = Cookie.getCookie("url");
    if (!redirectURL) redirectURL = "/";
    SignService.getToken(email)
      .then(res => {
        Cookie.setCookie("token", res.token);
        commit("isLoading", false);
        window.location.href = redirectURL;
      })
      .catch(() => {
        SignService.getUsername(email).then(info => {
          const recommender_id = Cookie.getCookie("recommender_id");
          SignService.register(
            info.username,
            email,
            Number(recommender_id)
          ).then(() => {
            SignService.getToken(email).then(res => {
              Cookie.setCookie("token", res.token);
              Cookie.clearCookie("recommender_id");
              commit("isLoading", false);
              window.location.href = redirectURL;
            });
          });
        });
      });
  },
  setToken({ commit }, token) {
    commit("setToken", token);
    commit("isLogin");
  }
};

export default actions;
