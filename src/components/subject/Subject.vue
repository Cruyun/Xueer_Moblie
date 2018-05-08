<template>
	<div :class="$style.object">
		<h2 :class="$style.title">{{ sub_info.title }}</h2>
		<div :class="$style.tip_info">
			<span :class="[$style.info, $style.info_left]">{{ sub_info.author }}</span>
			<span :class="[$style.info, $style.info_right]">{{ sub_info.date }}</span>
		</div>
		<div v-html='sub_info.body' :class="$style.cont"></div>
		<btns :likes="sub_info.likes"></btns>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Btns from "./Btns.vue";

export default {
  created() {
    this.isLoading(true);
    this.fetchSubject(this.$route.params.id);
    this.changePageFlagN("is_index");
    this.changePageFlagY("is_sub");
  },
  computed: {
    ...mapGetters(["sub_info"])
  },
  watch: {
    sub_info() {
      this.isLoading(false);
    }
  },
  methods: {
    ...mapActions([
      "fetchSubject",
      "changePageFlagN",
      "changePageFlagY",
      "isLoading"
    ])
  },
  components: {
    Btns
  },
  destroyed() {
    this.changePageFlagY("is_index");
    this.changePageFlagN("is_sub");
  }
};
</script>

<style lang='scss' module>
@import "../../assets/value.scss";

.object {
  font-size: 14px; /*px*/
  font-weight: 300;
  padding: 0 16px;
}
.title {
  font-size: 20px; /*px*/
  line-height: 28px;
  padding: 14px 0 16px;
  border-bottom: 1px solid $shallow_silver;
  color: $shallow_black;
}
.tip_info {
  font-size: 0;
  padding: 10px 0;
}
.info {
  font-size: 14px; /*px*/
  line-height: 14px;
  color: $shallow_grey;
  display: inline-block;
  width: 50%;
}
.info_left {
  text-align: left;
}
.info_right {
  text-align: right;
}
.cont {
  line-height: 18px; /*px*/
}
.cont p {
  margin: 15px 0;
}
.cont blockquote {
  padding: 10px 0 10px 20px; /*px*/
  margin: 30px 0 30px 30px; /*px*/
  position: relative;
  font-weight: 300;
  font-style: italic;
  color: $shallow_grey;
  letter-spacing: 0.08em;
  border-left: 6px solid #ddd;
}
.cont blockquote::before {
  position: absolute;
  left: -1.1em;
  content: "\201C";
}
.cont blockquote::after {
  content: "\201D";
  margin-left: 0.7em;
}
.cont blockquote p {
  margin: 15px 0 15px;
}
.object {
  ul {
    padding: 16px;
  }
  li {
    margin: 15px 0;
  }
}
</style>
