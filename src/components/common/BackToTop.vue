<template>
	<div v-show="back_to_top" v-scroll="scrollHandler" :class="$style.back_to_top">
        <svg :class="$style.arrow_icon">
           <a @click="backToTop">
           		<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back_to_top"></use>
           </a>
        </svg>
    </div>
</template>

<script>
import scroll from "../../directives/scroll";

export default {
  data() {
    return {
      back_to_top: false,
      step: 10
    };
  },
  methods: {
    scrollHandler() {
      const scrollTop = window.pageYOffset;
      if (!this.back_to_top && scrollTop > 400) {
        this.back_to_top = true;
      }
      if (this.back_to_top && scrollTop < 400) {
        this.back_to_top = false;
      }
    },
    backToTop() {
      window.smoothscroll = () => {
        const currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(window.smoothscroll);
          window.scrollTo(
            0,
            Math.floor(currentScroll - currentScroll / this.step)
          );
        }
      };
      window.smoothscroll();
    }
  },
  directives: {
    scroll
  }
};
</script>

<style lang='scss' module>
.back_to_top {
  height: 40px;
  width: 40px;
  position: fixed;
  bottom: 52px;
  right: 16px;
}
.arrow_icon {
  width: 100%;
  height: 100%;
}
</style>
