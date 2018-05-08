<template>
    <div :class="$style.next_batch">
        <div :class="$style.text">
            <div>ヾ (o ° ω ° O ) ノ゙ </div>
            <div>以上是学而觉得你可能会喜欢的课程。</div>
            <div :class="$style.last">不感兴趣？</div>
        </div>
        <div @click="nextBatch" :class="[{[$style.active]: is_active}, $style.bt]">
            <svg :class="$style.logo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#circulation"></use>
            </svg>
            <!-- 建议：把换一批改成查看更多 -->
            <span :class="$style.bt_text">换一批</span>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      is_active: false
    };
  },
  computed: {
    ...mapGetters(["courses"])
  },
  watch: {
    courses() {
      this.is_active = false;
    }
  },
  methods: {
    ...mapActions(["fetchCourse"]),
    nextBatch() {
      this.is_active = true;
      this.fetchCourse();
    }
  }
};
</script>
<style lang="scss" module>
.next_batch {
  padding-bottom: 34px;
}
.text {
  padding: 17px 0 0 72px;
  font-size: 14px; /*px*/
  color: #999999;
  line-height: 1;
}
.last {
  padding: 14px 0;
}
.bt {
  width: 156px;
  height: 40px;
  margin: 0 auto;
  border: 1px solid #eeab5d;
  border-radius: 2px;
  line-height: 40px;
  text-align: center;
  font-size: 0;
}
.bt_text {
  display: inline-block;
  font-size: 16px; /*px*/
  color: #eeab5d;
}
@keyframes trans_rorate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.logo {
  width: 13px;
  height: 13px;
  margin-right: 9px;
}
.logo use {
  fill: #eeab5d;
}
.active .logo {
  animation: trans_rorate linear 1s infinite;
}
</style>
