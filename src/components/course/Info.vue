<template>
	<div :class="[$style.info, $style[`info_bg${bg_index}`]]">
    <div :class="$style.info_content">
      <h2 :class="$style.title">{{ info.title }}</h2>
      <div :class="$style.teacher">{{ info.teacher }}</div>
      <div :class="$style.btns">
        <div @click="likeCourse" :class="$style.btn" :id="info.id">
          <svg viewBox="0 0 17 15"  v-bind:css="false" :class="[$style.icon,
          clickLike ? $style.heart_icon_filled : '',
          clickDisLike ? $style.heart_icon_out : '',
          notClick && liked ? $style.heart_icon_filled_end : '',
          notClick && !liked ? $style.heart_icon_out_end : '']">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#heart_f"></use>
          </svg>
          <svg viewBox="0 0 17 15" :class="[$style.icon]">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#heart_s"></use>
          </svg>
          <span :class="$style.btn_text">{{ info.likes }}</span>
        </div>
        <div @click="writeComment" :class="$style.btn" :id="info.id">
          <svg viewBox="0 0 17 14" :class="[$style.icon, $style.comment_icon]">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comments"></use>
          </svg>
          <span :class="$style.btn_text">写评价</span>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  data() {
    return {
      clickLike: false,
      clickDisLike: false,
      liked: this.info.liked,
      bg_index: 0
    };
  },
  created() {
    this.bg_index = Math.floor(Math.random() * 4) + 1;
  },
  computed: {
    ...mapGetters(["is_logined", "course_id"]),
    notClick() {
      if (!this.clickLike && !this.clickDisLike) {
        return true;
      }
      return false;
    }
  },
  methods: {
    ...mapActions(["fetchInfo", "showLogin", "courseLike", "courseDisLike"]),
    likeCourse() {
      if (this.is_logined) {
        if (this.info.liked) {
          // 已经点赞，现在来取消
          this.clickDisLike = true;
          this.clickLike = false;
          this.courseDisLike();
        } else {
          // 未点赞，现在来点
          this.clickLike = true;
          this.clickDisLike = false;
          this.courseLike();
        }
      } else {
        this.showLogin(true);
      }
    },
    writeComment() {
      if (this.is_logined) {
        this.$router.push({ path: `/course/${this.info.id}/comment` });
      } else {
        this.showLogin(true);
      }
    }
  }
};
</script>

<style lang='scss' module>
@import "../../assets/value.scss";
.info {
  height: 200px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  color: #fff;
  background-size: 100% 100%;
}
.info_bg1 {
  background-image: url("../../assets/xueer_bg_1.png");
}
.info_bg2 {
  background-image: url("../../assets/xueer_bg_2.png");
}
.info_bg3 {
  background-image: url("../../assets/xueer_bg_3.png");
}
.info_bg4 {
  background-image: url("../../assets/xueer_bg_4.png");
}
.info_content {
  width: 328px;
  height: 167px;
  margin: 0 auto;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: space-between;
}
.title {
  font-size: 20px; /*px*/
  padding-left: 10px;
  font-weight: lighter;
}
.teacher {
  font-size: 14px; /*px*/
  padding-left: 10px;
}
.btns {
  font-size: 0;
  width: 328px;
}
.btn {
  display: inline-block;
  border: 1px solid #fff; /*px*/
  border-radius: 4px; /*px*/
  vertical-align: top;
  overflow: hidden;
  font-size: 0;
  line-height: 14px;
  text-align: left;
  box-sizing: border-box;
  padding: 10px 40px;
}
.btn:first-child {
  margin-right: 16px;
}
.icon,
.btn_text {
  vertical-align: middle;
}
.btn_text {
  display: inline-block;
  min-width: 48px;
  text-align: center;
  font-size: 14px; /*px*/
}
.icon {
  width: 17px;
  height: 14px;
  margin-right: 8px;
  // position: absolute;
  fill: none;
}
.heart_icon_out_end {
  position: absolute;
  fill: #fff;
  transform: translateX(-667%);
}
.heart_icon_out {
  position: absolute;
  fill: #fff;
  animation-fill-mode: forwards;
  animation: heart_s ease-out 1s;
  transform: translateX(-667%);
}
@keyframes heart_s {
  0% {
    transform: translateX(0) rotate(0deg);
  }
  100% {
    transform: translateX(667%) rotate(400deg);
  }
}
.heart_icon_filled_end {
  position: absolute;
  fill: #fff;
}
.heart_icon_filled {
  position: absolute;
  fill: #fff;
  animation: heart_f ease-in-out 1s;
  animation-fill-mode: forwards;
}
@keyframes heart_f {
  0% {
    transform: translateX(-667%) rotate(-400deg);
  }
  100% {
    transform: translateX(0) rotate(0deg);
  }
}
</style>
