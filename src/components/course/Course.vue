<template>
	<div v-scroll="scrollHandler">
		<selector v-if="is_selected" :catgories="catgories"/>
		<reSort/>
    <courseList/>
		<div v-if='isend' :class="$style.hint">(￣▽￣") 已经是全部的结果啦</div>
		<div v-else :class="$style.hint">(￣▽￣") 加载中</div>
    <backToTop/>
    <loading v-show="loading"/>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import Selector from "./Selector.vue";
import ReSort from "./ReSort.vue";
import CourseList from "./CourseList.vue";
import scroll from "../../directives/scroll.js";
import BackToTop from "../common/BackToTop.vue";
import Loading from "../common/Loading.vue";

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
    // 判断store中是否已经有课程列表了，如果有，说明不是第一次加载课程列表。为了保持用户之前列表的状态，就不重新加载了。
    if (this.courses.length > 0) {
    } else {
      this.fetchCoursesList();
    }
  },
  computed: {
    ...mapGetters([
      "courses",
      "isend",
      "fetch_flag",
      "is_search",
      "is_recommend"
    ]),
    ...mapState({
      courses: state => state.courselist.courses,
      loading: state => state.courselist.loading,
      loadingMore: state => state.courselist.loadingMore,
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
      // TODO: 把scroll的位置同步到store，然后在返回列表的时候恢复滚动的位置。
      if (this.loadingMore) return;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 120 // 在滑到最底部之前，提前一点加载
      ) {
        // you're at the bottom of the page
        this.fetchNextCoursesList();
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
    BackToTop,
    Loading
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
