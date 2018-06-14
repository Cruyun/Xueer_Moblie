import UserService from "../../service/user";

const state = {
  email: "",
  username: "",
  link: "",
  recommendCount: 0,
  loadingLink: false
};
const getters = {};
const actions = {
  resetUserData({ commit }) {
    commit("reset");
  },
  fetchUserData({ commit }, token) {
    UserService.getCurrentUserInfo({ token }).then(res => {
      commit("setUserInfo", res);
    });
  },
  fetchLink({ commit }, token) {
    commit("setLoadingLink", true);
    commit("setLink", "加载中");
    UserService.getPromotionLink({ token }).then(res => {
      commit(
        "setLink",
        `【我分享了一条评课链接，快来看看吧】---点击 ${
          res.private_promotion_link
        } 进入👉学而👈评课；或复制链接，推荐给你的qq或微信好友完成此次邀请，一起来赢奶盖和零食套餐吧！
      `
      );
      commit("setLoadingLink", false);
    });
  }
};
const mutations = {
  reset(state) {
    state.email = "";
    state.username = "";
  },
  setUserInfo(state, info) {
    state.email = info.email;
    state.username = info.username;
    state.recommendCount = info.valid_recommend_count;
  },
  setLink(state, link) {
    state.link = link;
  },
  setLoadingLink(state, flag) {
    state.loadingLink = flag;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
