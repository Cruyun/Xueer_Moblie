<template>
	<div :class="$style.new_comment">
		<div :class="$style.new_comment_box">
			<textarea :class="$style.comment_cont" placeholder="写评论..." v-model="comment_text"></textarea>
			<div :class="$style.tag_cont">
				<svg :class="[$style.nav_icon, $style.tag_icon]">
		            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tag_icon"></use>
		        </svg>
		        <div :class="$style.input_cont">
		        	<div :class="$style.pre_tags">
		        		<span :class="$style.pre_tags_item" v-for="item in pre_tags" :key="item.id" >{{ item | preTag }}</span>
		        	</div>
		        	<div :class="$style.input_box">
		        		<input @keyup.delete="deleteTag" v-model='tags' :class="$style.tag_input" type="text" name="tag" placeholder="添加标签：输入一个标签后逗号间隔开">
		        	</div>
				</div>
			</div>
		</div>
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
      history.back();
    },
  },
  components: {
    Tag
  }
};
</script>
<style lang='scss' module>
@import "../../assets/value.scss";

.new_comment {
  padding-top: 17px;
  line-height: 14px;
  font-size: 0;
}
.new_comment_box {
  width: 328px;
  margin: 0 auto;
}
.comment_cont {
  display: block;
  width: 100%;
  height: 98px;
  font-size: 14px; /*px*/
  box-sizing: border-box;
  padding: 17px 18px;
  background: rgba(216, 216, 216, 0.25);
  border: 2px solid #ececec; /*px*/
}
.input_cont {
  line-height: 14px;
  padding: 12px 9px 9px 37px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 2px solid #ececec; /*px*/
}
.tag_cont {
  position: relative;
}
.tag_icon {
  position: absolute;
  left: 18px;
  top: 12px;
  width: 14px;
  height: 14px;
}
.pre_tags {
  color: #999999;
  float: left;
}
.pre_tags_item {
  font-size: 14px; /*px*/
}
.input_box {
  overflow: hidden;
}
.tag_input {
  padding-left: 0.5em;
  line-height: 14px;
  font-size: 14px; /*px*/
  width: 100%;
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
