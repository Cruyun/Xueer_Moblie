<template>
	<div v-scroll="scrollHandler">
		<selector @fetchAgain="searchAgain" v-if="is_selected" :catgories="catgories"></selector>
		<reSort></reSort>
    <courseList :courses="result"></courseList>
		<div v-if='search_end' :class="$style.hint">(￣▽￣") 已经是全部的结果啦</div>
		<div v-else :class="$style.hint">(￣▽￣") 加载中</div>
    <backToTop></backToTop>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import Selector from "./Selector.vue";
import ReSort from "./ReSort.vue";
import CourseList from "./CourseList.vue";
import scroll from "../../directives/scroll.js";
import BackToTop from "../common/BackToTop.vue";

export default {
  data() {
    return {
      flag: true
    };
  },
  mounted() {},
  computed: {
    ...mapGetters([
      "result",
      "search_end",
      "fetch_flag",
      "is_search",
      "is_recommend"
    ]),
    ...mapState({
      page: state => state.courselist.page,
      catgories: state => state.courselist.catgories
    }),
    ...mapState(["is_selected", "fetch_flag"])
  },
  methods: {
    ...mapActions([
      "searchCourse",
      "isLoading",
      "searchNextCourse",
      "setMainCat"
    ]),
    searchAgain() {
      this.isLoading(true);
      let main_cat = "null";
      if (this.catgories.length) {
        main_cat = this.catgories[0];
      }
      this.setMainCat(main_cat);
      this.searchCourse();
    },
    scrollHandler(ev) {
      if (this.search_end) return;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // you're at the bottom of the page
        this.searchNextCourse();
      }
    }
  },
  directives: {
    scroll
  },
  components: {
    Selector,
    ReSort,
    CourseList,
    BackToTop
  },
  beforeRouteLeave(to, from, next) {
    next();
  }
};
</script>

<style lang="scss" module>
.hint {
  font-size: 12px; /*px*/
  text-align: center;
  color: #999;
  margin-top: 16px;
  margin-bottom: 34px;
}
</style>
