<template>
	<div v-if="false" :class="$style.address">
        <h2 :class="$style.title">课程安排</h2>
        <div :class="$style.course_info">
            <div  v-for="item in loctime" :class="$style.item_box" :key="item.id">
                <span :class="$style.item">{{ item }}</span>
            </div>
        </div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["loctime"])
  }
};
</script>

<style lang='scss' module>
.address {
  padding: 0 13px 9px;
}
.title {
  height: 36px;
  font-size: 16px; /*px*/
  color: #666;
  line-height: 16px;
  box-sizing: border-box;
  padding-bottom: 16px;
  border-bottom: 1px solid #ececec;
}
.course_info {
  margin-top: 19px;
  margin-left: 17px;
}
.item_box {
  margin-bottom: 9px;
}
.item {
  display: inline-block;
  padding: 0 2px;
  color: #fff;
  font-size: 14px; /*px*/
  line-height: 20px;
  background: #60b9a6;
  border-radius: 2px;
}
</style>
