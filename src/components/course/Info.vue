<template>
	<div :class="$style.info">
		<h2 :class="$style.title">{{ info.title }}</h2>
		<div :class="$style.teacher">{{ info.teacher }}</div>
		<div :class="$style.btns">
			<div @click="likeCourse" :class="$style.btn" :id="info.id">
				<svg viewBox="0 0 17 15" :class="[$style.icon, $style.heart_icon_filled]">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#heart_f"></use>
				</svg>
				<svg viewBox="0 0 17 15" :class="[$style.icon, $style.heart_icon]">
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  computed: {
    ...mapGetters(["is_logined", "course_id"])
  },
  methods: {
    ...mapActions(["fetchInfo", "showLogin", "courseLike"]),
    likeCourse() {
      if (this.is_logined) {
        this.courseLike();
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
  position: relative;
  padding: 16px 0;
  color: #fff;
}
.info::before {
  content: ".";
  font-size: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -100;
  opacity: 0.8;
  filter: alpha(opacity=.8);
  background-color: $_yellow;
  width: 100%;
  height: 100%;
}
.info::after {
  content: ".";
  font-size: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -200;
  background-image: url("../../assets/course_bg.jpg");
  width: 100%;
  height: 100%;
}
.title {
  font-size: 20px; /*px*/
  line-height: 28px;
  padding: 0 31px;
}
.teacher {
  font-size: 14px; /*px*/
  line-height: 24px;
  padding: 16px 31px 7px;
}
.btns {
  font-size: 0;
  margin: 0 16px 16px;
}
.btn {
  display: inline-block;
  border: 2px solid #fff; /*px*/
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
.icon {
  width: 17px;
  height: 14px;
  margin-right: 8px;
}
.btn_text {
  display: inline-block;
  min-width: 48px;
  text-align: center;
  font-size: 14px; /*px*/
}
// .heart_icon,
// .heart_icon_filled {
//   transform: translateX(-5.555556rem);
// }
.heart_icon {
  animation-fill-mode: forwards;
  animation: heart_s ease-in-out 1s;
}
.heart_icon_filled {
  position: absolute;
  fill: #fff;
  animation: heart_f 1s ease-in-out 1s;
  animation-fill-mode: forwards;
}
@keyframes heart_s {
  0% {
    transform: translateX(0) rotate(0deg);
  }
  100% {
    transform: translateX(667%) rotate(400deg);
  }
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
