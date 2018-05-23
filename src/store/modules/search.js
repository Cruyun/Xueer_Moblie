import SearchService from "../../service/search";
const MAIN_CAT_MAP = {
  0: "null",
  1: "gg_cat",
  2: "ts_cat",
  3: "zy_cat",
  4: "sz_cat"
};
//创建一个方法，返回value值对应的key
function findKey(obj, value, compare = (a, b) => a === b) {
  return Object.keys(obj).find(k => compare(obj[k], value));
}
// params hepler
function getQueryParams(state) {
  let mainCatKey;
  let obj = {
    keywords: state.key_word,
    page: state.search_page,
    per_page: 20,
    main_cat: state.main_cat
  };
  return obj;
}
const state = {
  hot: [],
  show_search: false,
  result: [],
  search_page: 1,
  key_word: "",
  total_search_pages: 0,
  main_cat: 0
};
const getters = {
  hot: () => state.hot,
  result: () => state.result,
  show_search: () => state.show_search,
  search_end: state => {
    if (state.total_search_pages === 0) {
      return true;
    }
    return state.search_page == state.total_search_pages;
  }
};
const actions = {
  fetchHot({ commit }) {
    SearchService.getHot().then(json => {
      commit("fetchHot", json);
    });
  },
  showSearch({ commit }) {
    commit("showSearch");
  },
  hideSearch({ commit }) {
    commit("hideSearch");
  },
  setKeyWord({ commit }, key_word) {
    commit("setKeyWord", key_word);
  },
  setMainCat({ commit }, main_cat) {
    let index = findKey(MAIN_CAT_MAP, main_cat);
    commit("setMainCat", index);
  },
  searchCourse({ commit }) {
    commit("initPage");
    let param = getQueryParams(state);
    SearchService.searchCourse(param).then(({ json, headers }) => {
      let totalPages = Number(
        /page=([0-9]+)/.exec(headers[0].split(";")[1])[1]
      );
      commit("initResult");
      commit("insertResult", json);
      commit("settotalPages", totalPages);
    });
  },
  searchNextCourse({ commit }) {
    commit("searchPageAdd");
    let param = getQueryParams(state);
    SearchService.searchCourse(param).then(({ json, headers }) => {
      commit("insertResult", json);
    });
  }
};
const mutations = {
  setKeyWord(state, key_word) {
    state.key_word = key_word;
  },
  initPage(state) {
    state.search_page = 1;
  },
  setMainCat(state, main_cat) {
    state.main_cat = main_cat;
  },
  fetchHot(state, json) {
    state.hot = json;
  },
  showSearch(state) {
    state.show_search = true;
  },
  hideSearch(state) {
    state.show_search = false;
  },
  initResult(state) {
    state.result = [];
  },
  insertResult(state, json) {
    state.result = state.result.concat(json);
  },
  settotalPages(state, totalPages) {
    state.total_search_pages = totalPages;
  },
  searchPageAdd(state) {
    state.search_page++;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
