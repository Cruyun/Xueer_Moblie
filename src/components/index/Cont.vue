<template>
	<div :class="$style.cont">
		<div v-for="item in tips" :class="$style.artical_cont" :key="item.id">
			<router-link :to="{ name: 'tip', params: { id: item.id }}">
				<div :class="$style.img_cont">
					<img :src="item.img_url">
				</div>
				<p :class="$style.title">
					{{ item.title }}
				</p>
			</router-link>
			<div :class="$style.overview">
				<div :class="$style.like">
					<div :class="$style.view">
						<svg :class="$style.icon_views">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#views_count"></use>
						</svg>
						<span :class="$style.count">{{ item.views }}</span>
					</div>
					<div :class="$style.liked">
						<svg :class="$style.icon_likes">
							<use :class="$style.use" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#heart_f"></use>
						</svg>
						<span :class="$style.count">{{ item.likes }}</span>
					</div>
				</div>
				<div :class="$style.time">{{ item.date }}</div>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  mounted() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(["tips"])
  },
  methods: {
    ...mapActions(["fetchData"])
  }
};
</script>

<style lang='scss' module>
@import "../../assets/value.scss";

.img_cont {
  height: 140px;
}
.artical_cont {
  margin: 16px 16px 0;
  border: 1px solid $shallow_silver;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 0 0 0, 0 0 0 0, 0 2px 3px -2px currentColor, 0 0 0 0;
}
.artical_cont:last-child {
  margin-bottom: 16px;
}
.overview {
  z-index: -100;
  position: relative;
  padding: 18px 16px 16px;
}
.title {
  padding: 0 16px;
  font-size: 20px;
  line-height: 28px;
  margin-top: 16px;
  color: $shallow_black;
}
.like {
  font-size: 0;
  color: #fff;
}
.view,
.liked {
  display: inline-block;
  text-align: center;
  font-size: 0;
  width: 64px;
  height: 20px;
  border-radius: 2px;
  background: $_yellow;
}
.view {
  margin-right: 11px;
}
.icon_views {
  width: 20px;
  height: 20px;
}
.icon_likes {
  width: 15px;
  height: 20px;
}
.icon_likes use {
  fill: #fff;
}
.count,
.icon_views,
.icon_likes {
  vertical-align: middle;
}
.count {
  line-height: 20px;
  font-size: 12px; /*px*/
  padding-left: 7px;
}
.time {
  position: absolute;
  line-height: 20px;
  bottom: 16px;
  right: 16px;
  font-size: 12px;
  color: #999999;
}
</style>
