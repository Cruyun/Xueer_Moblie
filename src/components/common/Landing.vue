<template>
    <div :class="$style.container">
       登录中...
    </div>
</template>
<script>
// import Loading from "./Loading";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["is_loading"])
  },
  methods: {
    ...mapActions(["isLoading", "getToken"])
  },
  created() {
    this.isLoading(true);
    this.getToken();
  }
};
</script>

<style lang='scss' module>
.container {
  padding: 40px;
  text-align: center;
}
</style>
