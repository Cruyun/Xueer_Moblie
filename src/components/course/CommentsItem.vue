<template>
  <div :class="$style.space">
	  <div :class="$style.avatar">
			<img src="http://xueer.muxixyz.com/static/x_m/avatar.png">
	  </div>
	  <div :class="$style.content">
	      <div :class="$style.name">{{ item.user_name }}</div>
	      <div :class="$style.time">{{ item.date }}</div>
	      <div :class="$style.body">{{ item.body }}</div>
	      <div :class="$style.like">
	        <div :class="$style.touch_area">
            <div :id="item.likes" @click="likeComments(item, index, $event)" :class="[$style.like_bt]">
              <div :class="[$style.like_anim,
              clickLike ? $style.liked : '',
              notClick && item.liked ? $style.liked_end : '']">+1</div>
              <svg :class="[$style.like_icon]">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#heart_f"></use>
              </svg>
            </div>
	          <span :class="$style.like_count">{{ item.likes }}</span>
	        </div>
				</div>
	  </div>
	  <div v-if="item._body" @click="showMore(item)" :class="$style.more">
	    <svg :class="[item.body == item._body ? [$style.icon_up] : '', $style.more_icon]">
	      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_down"></use>
	    </svg>
			<span v-if="item.body == item._body" :class="$style.more_text">收起</span>
	    <span v-else :class="$style.more_text">查看全文</span>
	  </div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      isliked: false,
      more: false,
      body: "",
      clickLike: false,
      clickDisLike: false
    };
  },
  props: ["item", "index"],
  computed: {
    ...mapGetters(["is_logined", "course_id"]),
    notClick: function() {
      if (!this.clickLike && !this.clickDisLike) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions(["showLogin", "commentsLike", "commentsDisLike"]),
    showMore(item) {
      this.more = !this.more;
      if (!this.more) {
        item.body = this.body;
        return;
      }
      this.body = item.body;
      item.body = item._body;
    },
    likeComments(item, index, e) {
      if (this.is_logined) {
        let id = item.id;
        if (!item.liked) {
          // console.log("喜欢");
          this.clickLike = true;
          this.clickDisLike = false;
          this.commentsLike({ id, index });
        } else {
          //console.log("不喜欢");
          this.clickLike = false;
          this.clickDisLike = true;
          this.commentsDisLike({ id, index });
        }
      } else {
        this.showLogin(true);
      }
    }
  }
};
</script>

<style lang='scss' module>
@import "../../assets/value.scss";
@import "../../assets/common.scss";
.avatar,
.content {
  display: inline-block;
  vertical-align: top;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
  overflow: hidden;
}
.content {
  width: 273px;
  padding-bottom: 18px;
}
.name,
.time {
  font-size: 12px; /*px*/
  line-height: 16px;
  color: $shallow_grey;
}
.body {
  font-size: 14px; /*px*/
}
.like {
  font-size: 12px; /*px*/
  color: $shallow_grey;
  margin-top: 16px;
  text-align: right;
}
.like_end {
  fill: #ec6941;
}
.like_icon {
  width: 13px;
  height: 12px;
  margin-right: 6px;
}
.like_icon,
.like_count {
  display: inline-block;
  vertical-align: middle;
}
.like_icon use {
  fill: $shallow_grey;
}
.more {
  text-align: center;
  margin: 4px 0 9px;
}
.more_icon,
.more_text {
  vertical-align: middle;
}
.more_icon {
  width: 14px;
  height: 5px;
  margin-right: 6px;
}
.icon_up {
  transform: rotate(180deg);
}
.more_text {
  font-size: 14px; /*px*/
  color: $shallow_grey;
}
.like_bt {
  display: inline-block;
  position: relative;
}
.like_anim {
  width: 40px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 14px; /*px*/
  position: absolute;
  color: #ec6941;
  opacity: 0;
  left: -50%;
  top: -50%;
}
</style>
