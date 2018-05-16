<template>
	<div class="app" id='app'>
		<iconSvg></iconSvg>
		<navBar></navBar>
		<search></search>
		<index></index>
		<foot></foot>
		<loading></loading>
		<loginDialog></loginDialog>
	</div>
</template>

<script>
import IconSvg from "./components/common/IconSvg.vue";
import NavBar from "./components/common/NavBar.vue";
import Search from "./components/search/Search.vue";
import Index from "./components/index/Index.vue";
import Foot from "./components/common/Foot.vue";
import Loading from "./components/common/Loading.vue";
import LoginDialog from "./components/common/LoginDialog.vue";

export default {
  components: {
    IconSvg,
    NavBar,
    Search,
    Index,
    Foot,
    Loading,
    LoginDialog
  }
};
</script>

<style lang='scss'>
@import "./assets/common.scss";
@import "./assets/reset.scss";
.app {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
}
</style>
