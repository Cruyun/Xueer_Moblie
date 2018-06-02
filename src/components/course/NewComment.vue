<template>
	<div :class="$style.new_comment">
		<div :class="$style.new_comment_box">
			<textarea :class="$style.comment_cont" placeholder="请从教学质量、课程内容、给分、考勤、期末考察方式等方面评价，欢迎长篇/优质的评论" v-model="comment_text"></textarea>
			<div :class="$style.tag_cont">
				<svg :class="[$style.nav_icon, $style.tag_icon]">
		      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tag_icon"></use>
		    </svg>
		    <div :class="$style.pre_tags_item" v-for="item in pre_tags" :key="pre_tags.indexOf(item)" >{{item}}</div>
		    <input @keyup.delete="deleteTag" v-model='tags' :class="$style.tag_input" type="text" name="tag" placeholder="输入空格确认">
			</div>
		</div>
    <div :class="$style.hot_pre_tag">热门标签 点击直接添加</div>
		<tag></tag>
		<div :class="$style.btns">
			<div :class="[$style.btn,$style.btn_left]" @click="backStep">返回</div>
			<div :class="[$style.btn,$style.btn_right]" @click="setComment">提交</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { preTag } from "../../filters/filter.js";
import Tag from "../common/Tag.vue";

export default {
  data() {
    return {
      tags: "",
      comment_text: "",
      submit_body: {
        type: Object
      }
    };
  },
  computed: {
    ...mapGetters(["tag", "pre_tags", "token", "info"])
  },
  filters: {
    preTag
  },
  watch: {
    tags(val) {
      this.preTags(val);
      this.tags = this.tag;
    }
  },
  methods: {
    ...mapActions(["preTags", "deleteTag", "submitComment"]),
    setComment() {
      // 发送评论请求的 data
      this.submit_body.course_id = this.info.id;
      this.submit_body.comment_text = this.comment_text;
      this.submit_body.token = this.token;
      this.submitComment(this.submit_body);
    },
    backStep() {
      window.history.back();
    }
  },
  components: {
    Tag
  }
};
</script>
<style lang='scss' module>
@import "../../assets/value.scss";

.new_comment {
  font-weight: normal;
  padding-top: 17px;
  line-height: 14px;
  font-size: 0;
  padding-bottom: 20px;
}
.new_comment_box {
  width: 328px;
  margin: 0 auto;
}
.comment_cont {
  display: block;
  width: 100%;
  height: 150px;
  font-size: 14px; /*px*/
  box-sizing: border-box;
  padding: 17px 18px;
  border-top: 1px solid #ececec; /*px*/
  border-bottom: 1px solid #ececec; /*px*/
}
.tag_cont {
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom: 1px solid #ececec; /*px*/
  padding: 10px 10px;
}
.tag_icon {
  width: 14px;
  height: 14px;
  line-height: 21px;
  align-self: center;
}
.hot_pre_tag {
  font-size: 12px; /*px*/
  padding-left: 34px;
  padding-top: 10px;
  color: #ececec;
}
.pre_tags_item {
  font-size: 14px; /*px*/
  line-height: 21px;
  margin-left: 5px;
  color: #999;
}
.tag_input {
  padding-left: 0.5em;
  line-height: 21px;
  font-size: 14px; /*px*/
  width: 100px;
}
.btns {
  width: 332px;
  margin: 50px auto 0;
}
.btn {
  display: inline-block;
  width: 156px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  box-sizing: border-box;
  border: 1px solid $_yellow;
  border-radius: 2px;
  font-size: 14px; /*px*/
}
.btn_left {
  color: $_yellow;
  margin-right: 18px;
}
.btn_right {
  color: #fff;
  background: $_yellow;
}
</style>
