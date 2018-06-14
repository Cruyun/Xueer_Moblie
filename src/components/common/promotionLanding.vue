<template>
    <div :class="$style.container">
       跳转中...
    </div>
</template>
<script>
import { mapActions } from "vuex";
import { getParameterByName } from "../../util";

export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapActions(["setRecommender"])
  },
  created() {
    const id = getParameterByName("id") || null;
    if (id) {
      this.setRecommender(id);
    }
    // 确保 recommender id 在 cookie 中设置完成
    setTimeout(() => {
      window.location =
        "https://user.muxixyz.com/?landing=xueer.muxixyz.com/landing";
    }, 700);
  }
};
</script>

<style lang='scss' module>
.container {
  padding: 40px;
  text-align: center;
}
</style>
