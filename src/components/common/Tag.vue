<template>
	<div @click='addTag' :class='$style.tags'>
		<span v-for='item in hot_tag' :class='$style.tags_item' :key="item.id">{{ item }}</span>
	</div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      val: ""
    };
  },
  computed: {
    ...mapGetters(["hot_tag"])
  },
  methods: {
    ...mapActions(["clickTag", "getTags"]),
    addTag(ev) {
      if (ev.target.tagName == "SPAN" || "span") {
        if (this.val == ev.target.textContent) {
          return;
        }
        this.val = ev.target.textContent;
        this.$store.commit("clickTag", this.val);
      }
    }
  },
  created() {
    this.getTags();
  }
};
</script>
<style lang='scss' module>
.tags {
  padding: 22px 28px 1px 34px;
}
.tags_item {
  font-size: 28px; /*px*/
  border-radius: 4px; /*px*/
  display: inline-block;
  line-height: 14px;
  background-color: #cdcdcd;
  padding: 3px;
  color: #fff;
  margin-right: 6px;
}
</style>
