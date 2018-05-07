<template>
	<div v-scroll="scrollHandler">
		<selector v-if="is_selected" :catgories="catgories"></selector>
		<reSort></reSort>
    <courseList></courseList>
		<div v-if='isend' :class="$style.hint">(￣▽￣") 已经是全部的结果啦</div>
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
  mounted() {
    this.changePageFlagN(["is_index", "is-recommend"]);
    this.changePageFlagY(["is_all"]);
    this.$route.params.page == "all" ? "" : (this.flag = false);
    let page = this.page;
    this.fetchCoursesList();
  },
  computed: {
    ...mapGetters(["isend", "fetch_flag", "is_search", "is_recommend"]),
    ...mapState({
      page: state => state.courselist.page,
      catgories: state => state.courselist.catgories
    }),
    ...mapState(["is_selected", "fetch_flag"])
  },
  methods: {
    ...mapActions([
      "getPosition",
      "changePageFlagN",
      "changePageFlagY",
      "fetchCoursesList",
      "fetchNextCoursesList"
    ]),
    scrollHandler(ev) {
      if (this.loadingMore) return;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // you're at the bottom of the page
        this.fetchNextCoursesList();
      }
      // const scroll_height = document.body.scrollTop;
      // const doc_height = document.body.scrollHeight;
      // if (!this.window_height) {
      //   this.window_height = window.innerHeight;
      // }
      // const height = scroll_height + this.window_height;
      // if (height == doc_height && this.fetch_flag == true) {
      //   this.changePageFlagN("fetch_flag");
      //   this.fetchCourse(this.$route.params.sort);
      // }
      // if (scroll_height == 0 && this.fetch_flag == true) {
      //   this.changePageFlagN("fetch_flag");
      //   this.fetchCourseN(this.$route.params.sort);
      // }
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
    // this.getPosition(document.body.scrollTop);
    // // 跳转到detail还会有个莫名其妙的滚动
    // this.changePageFlagN("fetch_flag");
    // if (to.name === "course") {
    //   this.changePageFlagN("is_index");
    //   this.changePageFlagN("is_all");
    //   this.changePageFlagY("is_course");
    // }
    // this.changePageFlagN(["is_search", "is_all", "is_recommend"]);
    // this.changePageFlagY("is_index");
    next();
  }
};
</script>

<style lang="scss" module>
.hint {
  font-size: 24px; /*px*/
  text-align: center;
  color: #999;
  margin-top: 16px;
  margin-bottom: 34px;
}
</style>