<template>
	<div :class="$style.nav_bar">
		<div :class="$style.container">
			<div :class="$style.title_set">
				<div v-if="currentRoute === 'index'">
					<router-link :class="[$style.active,$style.link]" :to="{ name: 'index', params: { page: 'index' }}">
						<svg :class="[$style.nav_icon, $style.logo]">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#logo"></use>
						</svg>
						<!-- <span v-if="is_search" :class="[$style.title_s, $style.title]">搜索</span> -->
					</router-link>
				</div>
				<div @click="backStep">
					<svg  v-if="currentRoute !== 'index'" viewBox="0 0 34 34" :class="[$style.back, $style.nav_icon]">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
					</svg>
					<span v-if="currentRoute === 'all'" :class="[$style.title_l, $style.title]">所有课程</span>
        	<span v-if="currentRoute === 'course'" :class="[$style.title_l, $style.title]">课程详情</span>
					<!-- <span v-if="is_search_res" :class="[$style.title_l, $style.title]">搜索结果</span>
					<span v-if="is_recommend" :class="[$style.title_l, $style.title]">推荐课程</span>
					<span v-if="is_auth" :class="[$style.title_l, $style.title]">我的学而</span>
					<span v-if="is_sub" :class="[$style.title_l, $style.title]">专题</span> -->
				</div>
			</div>
			<div :class="$style.icon_set">
				<div @click="displaySearch" data-link="/search" :class="[$style.nav_icon, $style.search]">
					<svg viewBox="0 0 34 34">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
					</svg>
				</div>
				<div @click="toLogin" :class="[$style.nav_icon, $style.user, $style.link]">
					<svg viewBox="0 0 34 34">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
					</svg>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import Cookie from "../../service/cookie";

export default {
  computed: {
    ...mapState(["page_flag", "currentRoute"]),
    ...mapGetters([
      "snaps",
      "is_index",
      "is_recommend",
      "is_all",
      "is_search",
      "is_auth",
      "is_course",
      "is_sub"
    ])
  },
  methods: {
    ...mapActions([
      "showSearch",
      "changePageFlagN",
      "changePageFlagY",
      "getSnaps"
    ]),
    backStep() {
      this.$router.go(-1);
    },
    displaySearch() {
      this.getSnaps(this.snaps);
      this.showSearch();
      // this.changePageFlagY(['is_search'])
      // this.changePageFlagN(['is_all','is_auth','is_recommend','is_sub'])
    },
    toLogin() {
      Cookie.setCookie('url', window.location.href);
      //window.location = "https://user.muxixyz.com/?http://xueer.muxixyz.com/landing"
      window.location.href = 
        "/landing/?email=1045671796%40qq.com&token=eyJhbGciOiJIUzI1NiIsImV4cCI6MTUxNDAzMDQyNywiaWF0IjoxNTE0MDI2ODI3fQ.eyJpZCI6MjY3fQ.bOgABI7EbpNgqhd1IT-6xvRiq4PHrTkZKkYe6zQxnNc";
    }
  }
};
</script>

<style lang='scss' module>
@import "../../assets/value.scss";
.nav_bar {
  border-bottom: 1px solid $shallow_silver;
  position: fixed;
  width: 100%;
  background: #fff;
  z-index: 101;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
}
.container {
  width: 328px;
  margin: 0 auto;
  font-size: 0;
  line-height: 56px;
}
.logo {
  height: 32px;
  width: 71px;
}
.title_set {
  display: inline-block;
  width: 240px;
  text-align: left;
}
.nav_icon use {
  fill: none;
}
.icon_set {
  display: inline-block;
  width: 87px;
  text-align: right;
}
.back,
.search,
.user {
  height: 34px;
  width: 34px;
}
.search {
  margin-right: 16px;
}
.nav_icon use {
  fill: none;
}
.nav_icon {
  display: inline-block;
  vertical-align: middle;
}
.title_s {
  border-left: 2px solid #30b38a; /*px*/
  line-height: 1;
  font-size: 16px;
  vertical-align: middle;
  padding-left: 7px;
  margin-left: 7px;
}
.title {
  color: #30b38a;
}
.title_l {
  padding-left: 16px;
  vertical-align: middle;
  line-height: 20px;
  font-size: 20px;
}
</style>
