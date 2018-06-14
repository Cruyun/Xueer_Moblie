import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import home from "./modules/home";
import subject from "./modules/subject";
import detail from "./modules/detail";
import search from "./modules/search";
import newcomments from "./modules/newcomments";
import tag from "./modules/tag";
import user from "./modules/user";
import courselist from "./modules/courselist";

Vue.use(Vuex);
const store = new Vuex.Store({
  state,
  getters,
  actions,
  modules: {
    home,
    subject,
    detail,
    search,
    newcomments,
    tag,
    courselist,
    user
  },
  mutations
});
export default store;
