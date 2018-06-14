<template>
    <div @click.self="hideSelector" :class="$style.selector">
        <div :class="$style.selector_cont">
            <div :class="$style.items">
                <div id="gg_cat" @click="addCat" :class="[$style.item, $style.tag, $style.margin_bottom, selected.indexOf('gg_cat') > -1 ? 'filter-active':'']">公共课</div>
                <div id="zy_cat" @click="addCat" :class="[$style.item, $style.tag, $style.margin_bottom,  selected.indexOf('zy_cat') > -1 ? 'filter-active':'']">专业课</div>
                <div id="ts_cat" @click="addCat" :class="[$style.item, $style.tag, $style.margin_bottom, selected.indexOf('ts_cat') > -1 ? 'filter-active':'']">通识课</div>
                <div id="sz_cat" @click="addCat" :class="[$style.item, $style.tag, $style.margin_bottom, selected.indexOf('sz_cat') > -1 ? 'filter-active':'']">素质课</div>
                <div v-if="selected.indexOf('ts_cat') > -1" id="ts_cat_core" @click="addSubCat(2)" :class="[$style.item, $style.tag,  (subCatgories == 2 || subCatgories == 0) ? 'filter-active':'']">通识选修课</div>
                <div v-if="selected.indexOf('ts_cat') > -1" id="ts_cat_optional" @click="addSubCat(1)" :class="[$style.item, $style.tag,  (subCatgories == 1 || subCatgories == 0) ? 'filter-active':'']">通识核心课</div>
            </div>
            <div @click="select" :class="[$style.bt, $style.item]">确定</div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: ["catgories", "subCatgories", "changeSelector", "changeSubSelector"],
  data() {
    return {
      isactive: true,
      selected: this.catgories
    };
  },
  methods: {
    ...mapActions(["showSelector", "fetchCoursesList"]),
    addCat(e) {
      const index = this.selected.indexOf(e.target.id);
      if (index == -1) {
        this.selected.push(e.target.id);
        e.target.className += " filter-active";
      } else {
        this.selected.splice(index, 1);
        const arr = e.target.className.split(" ");
        arr.pop();
        e.target.className = arr.join(" ");
      }
    },
    addSubCat(e) {
      if (e == 1) {
        if (this.subCatgories == 0) this.changeSubSelector(2);
        if (this.subCatgories == 1) this.changeSubSelector(2);
        if (this.subCatgories == 2) this.changeSubSelector(0);
      }
      if (e == 2) {
        if (this.subCatgories == 0) this.changeSubSelector(1);
        if (this.subCatgories == 1) this.changeSubSelector(0);
        if (this.subCatgories == 2) this.changeSubSelector(1);
      }
    },
    hideSelector() {
      this.showSelector(false);
    },
    select() {
      this.hideSelector();
      console.log(this.selected)
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
.margin_bottom {
  margin-bottom: 16px;
}
</style>
