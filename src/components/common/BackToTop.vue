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
      back_to_top: false
    };
  },
  methods: {
    scrollHandler() {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 400) {
        this.back_to_top = true;
      } else {
        this.back_to_top = false;
      }
    },
    backToTop() {
      window.scroll(0, 0);
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