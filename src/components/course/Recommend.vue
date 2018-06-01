<template>
	<div>
		<selector v-if="is_selected"></selector>
        <courseList></courseList>
        <nextBatch></nextBatch>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import Selector from "./Selector.vue";
import CourseList from "./CourseList.vue";
import NextBatch from "./NextBatch.vue";

export default {
  computed: {
    ...mapState(["is_selected", "is_index"])
  },
  mounted() {
    const self = this;
    setTimeout(() => {
      self.changePageFlagY(["is_recommend"]);
      self.changePageFlagN(["is_index"]);
    }, 0);
  },
  methods: {
    ...mapActions(["getPosition", "changePageFlagN", "changePageFlagY"])
  },
  components: {
    Selector,
    CourseList,
    NextBatch
  },
  beforeRouteLeave(to, from, next) {
    this.getPosition(document.body.scrollTop);
    this.flag = false;
    if (to.name === "course") {
      this.changePageFlagN(["is_index", "is_all"]);
      this.changePageFlagY("is_course");
    }
    this.changePageFlagN(["is_recommend", "is_search", "is_all"]);
    this.changePageFlagY("is_index");
    next();
  },
  beforeDestory() {
    this.changePageFlagN("is_recommend");
  }
};
</script>
