<template>
	<div :class="$style.tags">
		<span v-for="item in hot_tag" :class="$style.tags_item" :key="hot_tag.indexOf(item)"  @click="addTag(item)">{{ item }}</span>
	</div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      item: ""
    };
  },
  computed: {
    ...mapGetters(["hot_tag", "tag_exist"])
  },
  methods: {
    ...mapActions(["addPreTag", "getTags"]),
    addTag(item) {
      this.$store.commit("addPreTag", item);
    }
  },
  created() {
    if (!this.tag_exist) {
      this.getTags();
    }
  }
};
</script>
<style lang='scss' module>
.tags {
  padding: 10px 28px 1px 34px;
}
.tags_item {
  font-size: 14px;
  border-radius: 2px; /*px*/
  display: inline-block;
  line-height: 14px;
  background-color: #cdcdcd;
  padding: 3px;
  color: #fff;
  margin-right: 6px;
  margin-bottom: 6px;
}
</style>
