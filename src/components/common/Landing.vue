<template>
    <div>
        <!-- <Loading></Loading> -->
    </div>
</template>
<script>
// import Loading from "./Loading";
import { mapState, mapGetter, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["is_loading"])
  },
  // components: {
  //   Loading: Loading
  // },
  methods: {
    ...mapActions(["isLoading", "getToken"])
  },
  created() {
    this.isLoading(true);
    this.getToken()
  }
};
</script>