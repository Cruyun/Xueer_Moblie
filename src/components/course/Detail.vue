<template>
	<div :class="$style.detail">
		<info :info='info'/>
		<div :class="$style.tags">
      <span :class="$style.tags_item">{{info.main_category}}</span>
			<span v-for="item in hot_tags" :class="$style.tags_item" :key="item.id">{{ item }}</span>
		</div>
		<addition/>
		<div v-if="hot_comments.length != 0" :class="$style.comments">
			<h2 :class="$style.comments_title">热门评论</h2>
			<comment :comments="hot_comments"></comment>
		</div>
		<div :class="$style.comments">
			<h2 :class="[$style.comments_title, $style.title_all]">所有评论</h2>
			<comment :comments="comments"></comment>
			<div v-if="more" @click="moreComments" :class="$style.more_comments">展开更多评价</div>
			<div v-if="!more && comments.length != 0" :class="$style.no_more_comments">
				∑(っ °Д °;)っ
				<br>没有更多评价了。
			</div>
		</div>
		<div v-if="comments.length == 0" :class="$style.no_comments">∑(っ °Д °;)っ<br>没有任何评价，快去添加第一条评价吧。</div>
		<backToTop/>
    <loading v-show="loading"/>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import Comment from "./Comments.vue";
import Info from "./Info.vue";
import BackToTop from "../common/BackToTop.vue";
import Addition from "./Addition.vue";
import Loading from "../common/Loading.vue";

export default {
  data() {
    return {
      id: this.$route.params.id
    };
  },
  computed: {
    ...mapState({
      loading: state => state.detail.loading
    }),
    ...mapGetters([
      "info",
      "hot_tags",
      "comments",
      "hot_comments",
      "more",
      "back"
    ])
  },
  mounted() {
    this.fetchAll(this.id);
    window.scroll(0, 0);
  },
  methods: {
    ...mapActions(["fetchAll", "fetchMoreComments", "turnFlag"]),
    moreComments() {
      this.fetchMoreComments();
    }
  },
  components: {
    Comment,
    Info,
    BackToTop,
    Addition,
    Loading
  },
  beforeRouteLeave(to, from, next) {
    next();
  }
};
</script>

<style lang='scss' module>
@import "../../assets/value.scss";
.detail {
  font-weight: lighter;
}
.tags {
  padding: 22px 28px 1px 34px;
}
.tags_item {
  font-size: 14px; /*px*/
  border-radius: 2px; /*px*/
  display: inline-block;
  line-height: 14px;
  background-color: #cdcdcd;
  padding: 3px;
  color: #fff;
  margin-right: 6px;
  margin-bottom: 16px;
}
.comments {
  width: 333px;
  margin: 0 auto;
}
.comments_title {
  font-size: 16px; /*px*/
  padding: 0 0 16px;
  color: #666;
  border-bottom: 1px solid #ececec; /*px*/
}
.more_comments {
  border: 1px solid currentColor; /*px*/
  border-radius: 4px; /*px*/
  text-align: center;
  width: 156px;
  line-height: 38px;
  font-size: 16px; /*px*/
  color: $_yellow;
  margin: 17px auto;
}
.no_more_comments {
  font-size: 14px; /*px*/
  color: #999;
  width: 120px;
  margin: 0 auto;
  padding: 15px 0;
}
.no_comments {
  padding-top: 15px;
  font-size: 14px; /*px*/
  text-align: center;
  color: #999;
}
</style>
