<template>
	<div :class="$style.btns">
		<div @click="likeThis" :class="[$style.tip_btn, $style.tip_btn_like]">
      <svg :class="$style.tip_icon" v-if="liked">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#heart_f_orange"></use>
			</svg>
			<svg :class="$style.tip_icon" v-if="!liked">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#heart_s_orange"></use>
			</svg>
			<span :class="$style.likes">{{ likes }}</span>
		</div>
		<div @click="backIndex" :class="[$style.tip_btn, $style.tip_btn_back]">返回首页</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["likes", "liked"],
  computed: {
    ...mapGetters(["is_logined"])
  },
  methods: {
    ...mapActions(["showLogin", "likeTip", "cancelLike"]),
    backIndex() {
      window.history.go(-1);
    },
    likeThis() {
      if (!this.is_logined) this.showLogin(true);
      else if (!this.liked) {
        this.likeTip();
      } else {
        this.cancelLike();
      }
    }
  }
};
</script>

<style lang='scss' module>
.btns {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-around;
}
.tip_icon {
  width: 16px;
  height: 15px;
}
.tip_btn {
  border: 1px solid #eeab5d; /*px*/
  font-size: 14px; /*px*/
  border-radius: 4px; /*px*/
  width: 154px;
  height: 40px;
  line-height: 38px;
  text-align: center;
  box-sizing: border-box;
  color: #eeab5d;
}
.tip_btn_like {
  display: flex;
  align-items: center;
  justify-content: center;
}

.likes {
  margin-left: 10px;
}
</style>
