import SearchService from "../../service/search";

// params hepler
function getQueryParams(state) {
  let obj = {
    keywords: state.key_word,
    page: state.search_page,
    sort: state.sort,
    pre_page: state.pre_page
  };
  if (state.catgories.length >= 0) {
    state.catgories.forEach(item => {
      obj[item] = 1;
    });
  }
  return obj;
}

const state = {
  hot: [],
  show_search: false,
  result: [],

  // params
  search_page: 1,
  key_word: "",
  total_search_pages: 0,
  sort: "view",
  catgories: [],
  pre_page: 20
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
  changeSearchSortMethod({ commit }, method) {
    commit("setSort", method);
  },
  changeSearchSelector({ commit }, sort) {
    commit("changeSelector", sort);
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
  setSort(state, sort) {
    state.sort = sort;
  },
  changeSelector(state, sort) {
    state.catgories = sort;
  },
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
