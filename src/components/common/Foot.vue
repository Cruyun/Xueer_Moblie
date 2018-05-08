<template>
	<div :class="$style.footer">
        <div :class="$style.title">华中师范大学&nbsp;|&nbsp;木犀团队</div>
        <div :class="$style.links">
            <div :class="$style.row">
                <a href="http://muxistudio.com" :class="$style.item">关于木犀</a>
                <a href="http://form.mikecrm.com/GFFw2v" :class="$style.item">意见反馈</a>
                <a href="http://muxistudio.com" :class="$style.item">加入我们</a>
            </div>
        </div>
        <div :class="$style.copyright">Proudly Prowered by Vue &amp; Flask</div>
    </div>
</template>
<style lang='scss' module>
.footer {
  width: 100%;
  min-height: 124px;
  background-color: #666;
  text-align: center;
  color: #999;
}
.title {
  font-size: 16px; /*px*/
  padding: 16px 0 18px;
}
.row {
  font-size: 0;
}
.copyright {
  padding-top: 16px;
}
.copyright,
.item {
  font-size: 12px; /*px*/
}
.item {
  display: inline-block;
  width: 33.3%;
  box-sizing: border-box;
  color: #999;
}
.item:nth-child(1),
.item:nth-child(2) {
  border-right: 2px solid #999;
}
</style>
