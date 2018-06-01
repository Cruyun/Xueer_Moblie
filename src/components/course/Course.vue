<template>
	<div v-scroll="scrollHandler">
		<selector @change="fetchCoursesList" :changeSelector="changeSelector" v-if="is_selected" :catgories="catgories"/>
		<reSort @change="fetchCoursesList" :changeSortMethod="changeSortMethod"/>
    <courseList :courses="courses"/>
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
    return {};
  },
  mounted() {
    window.scrollTo(0, this.scrollTop);
    // 判断store中是否已经有课程列表了，如果有，说明不是第一次加载课程列表。为了保持用户之前列表的状态，就不重新加载了。
    if (this.courses.length <= 0) {
      this.fetchCoursesList();
    }
  },
  computed: {
    ...mapGetters(["courses", "isend"]),
    ...mapState({
      scrollTop: state => state.courselist.scrollTop,
      courses: state => state.courselist.courses,
      loading: state => state.courselist.loading,
      loadingMore: state => state.courselist.loadingMore,
      page: state => state.courselist.page,
      catgories: state => state.courselist.catgories
    }),
    ...mapState(["is_selected"])
  },
  methods: {
    ...mapActions([
      "setScrollTop",
      "changeSelector",
      "fetchCoursesList",
      "fetchNextCoursesList",
      "changeSortMethod"
    ]),
    scrollHandler() {
      // 把scroll的位置同步到store，然后在返回列表的时候恢复滚动的位置。
      this.setScrollTop(window.scrollY);
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
