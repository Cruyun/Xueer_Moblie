<template>
	<div :class="$style.btns">
		<div @click="likeThis" :class="[$style.tip_btn, $style.tip_btn_like]">
			<svg :class="$style.tip_icon">
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
  props: ["likes"],
  methods: {
    ...mapActions(["showLogin"]),
    backIndex() {
      history.go(-1);
    },
    likeThis() {
      this.showLogin(true);
    }
  }
};
</script>

<style lang='scss' module>
.btns {
  font-size: 0;
  text-align: center;
  margin-bottom: 15px;
}
.tip_icon {
  width: 16px;
  height: 15px;
  display: inline-block;
}
.tip_btn {
  border: 1px solid #eeab5d;
  font-size: 14px; /*px*/
  border-radius: 4px; /*px*/
  display: inline-block;
  vertical-align: top;
  width: 154px;
  height: 40px;
  line-height: 38px;
  text-align: center;
  box-sizing: border-box;
  color: #eeab5d;
}
.tip_btn_like {
  font-size: 0;
  margin-right: 20px;
}
.tip_icon,
.likes {
  vertical-align: middle;
}
</style>
