<template>
    <div @click.self="hideSelector" :class="$style.selector">
        <div :class="$style.selector_cont">
            <div :class="$style.items">
                <div id="gg_cat" @click="addTag" :class="[$style.item, $style.tag, $style.first_line, selected.indexOf('gg_cat') > -1 ? 'filter-active':'']">公共课</div>
                <div id="zy_cat" @click="addTag" :class="[$style.item, $style.tag, $style.first_line,  selected.indexOf('zy_cat') > -1 ? 'filter-active':'']">专业课</div>
                <div id="ts_cat" @click="addTag" :class="[$style.item, $style.tag,  selected.indexOf('ts_cat') > -1 ? 'filter-active':'']">通识课</div>
                <div id="sz_cat" @click="addTag" :class="[$style.item, $style.tag,  selected.indexOf('sz_cat') > -1 ? 'filter-active':'']">素质课</div>
            </div>
            <div @click="select" :class="[$style.bt, $style.item]">确定</div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: ["catgories", "changeSelector"],
  data() {
    return {
      isactive: true,
      selected: this.catgories
    };
  },
  methods: {
    ...mapActions(["showSelector", "fetchCoursesList"]),
    addTag(e) {
      const index = this.selected.indexOf(e.target.id);
      if (index == -1) {
        this.selected.push(e.target.id);
        e.target.className += " filter-active";
      } else {
        this.selected.splice(index, 1);
        let arr = e.target.className.split(" ");
        arr.pop();
        e.target.className = arr.join(" ");
      }
    },
    hideSelector() {
      this.showSelector(false);
    },
    select() {
      this.hideSelector();
      this.changeSelector(this.selected);
      this.$emit("change");
      this.is_selected
        ? (document.body.className = "no_scroll")
        : (document.body.className = "");
    }
  }
};
</script>
<style lang="scss" module>
.selector {
  padding-top: 103px;
  position: absolute;
  top: 0;
  height: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
}
.selector_cont {
  padding: 16px 13px 20px;
  display: inline-block;
  background: #fff;
}
.items {
  font-size: 0;
}
.item {
  width: 156px;
  height: 40px;
  display: inline-block;
  border-radius: 2px;
  line-height: 40px;
}
.tag {
  background: #f3f3f3;
  font-size: 14px; /*px*/
  color: #666666;
}
.bt {
  margin-top: 20px;
  box-sizing: border-box;
  font-size: 14px; /*px*/
  color: #eeab5d;
  border: 1px solid currentColor;
}
.item:nth-child(odd) {
  margin-right: 20px;
}
.first_line {
  margin-bottom: 16px;
}
</style>
