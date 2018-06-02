<template>
	<div v-if="show_login" :class="$style.dialog">
	    <div :class="$style.dialog_top">
	        <div :class="$style.dialog_img"></div>
	        <div :class="$style.dialog_text">请登录后操作</div>
	    </div>
	    <div :class="$style.dialog_btns">
	        <div @click="cancel" :class="[$style.dialog_btn, $style.dialog_btn_cancel]">等会再说</div>
            <div @click="toLogin" :class="[$style.dialog_btn, $style.dialog_btn_login]">去登录</div>
	    </div>
	 </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Cookie from "../../service/cookie.js";

export default {
  data() {
    return {
      flag: true
    };
  },
  computed: {
    ...mapState(["show_login"])
  },
  methods: {
    ...mapActions(["showLogin"]),
    cancel() {
      this.showLogin(false);
    },
    toLogin() {
      Cookie.setCookie("url", window.location.href);
      // for development
      // window.location =
      //   "https://user.muxixyz.com/?landing=192.168.43.46:3000/landing";
      // for production
      window.location =
        "https://user.muxixyz.com/?landing=xueer.muxixyz.com/landing";
    }
  }
};
</script>

<style lang='scss' module>
.dialog {
  z-index: 5;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 296px;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  border: 2px solid #2bbb8f;
  border-radius: 2px;
}
.dialog_top {
  margin-top: 16px;
}
.dialog_img {
  width: 217px;
  height: 101px;
  margin: 0 auto;
  background-image: url(http://7oxh2b.com1.z0.glb.clouddn.com/bunny.png);
  background-size: contain;
  background-repeat: no-repeat;
}
.dialog_text {
  font-size: 14px; /*px*/
  color: #999;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 15px;
}
.dialog_btns {
  font-size: 0;
  color: #fff;
  background-color: #2bbb8f;
}
.dialog_btn {
  font-size: 14px;
  margin: 3px 0;
  line-height: 36px;
  display: inline-block;
  width: 50%;
  text-align: center;
  box-sizing: border-box;
}
.dialog_btn_cancel {
  border-right: 2px solid #fff; /*px*/
}
</style>
