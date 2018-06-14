<template>
	<div id="dialog" v-if="show" :class="[$style.dialog, hidden ? $style.hidden: '']">
	    <div :class="$style.dialog_top">
	        <div :class="$style.dialog_text">{{text}}</div>
	    </div>
	 </div>
</template>
<script>
export default {
  props: ["show", "text", "durition", "onHide"],
  data() {
    return {
      hidden: false
    };
  },
  computed: {},
  mounted() {
    if (this.durition) {
      const self = this;
      setTimeout(() => {
        self.hidden = true;
        self.onHide();
      }, self.durition);
    }
  },
  methods: {
    onCancel() {
      this.$emit("cancel");
    },
    onOK() {
      this.$emit("ok");
    }
  }
};
</script>

<style lang='scss' module>
.hidden {
  display: none;
}
.dialog {
  z-index: 1000;
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
  padding-bottom: 10px;
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
