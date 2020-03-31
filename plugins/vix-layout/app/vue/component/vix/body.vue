<template>
  <div class="application-body" :class="{hasfooter: $store.state.Vix.footer.show, noheader: !$store.state.Vix.header.show}" :style="{'background-color': $store.state.Vix.backgroundColor}">
    <div class="application-body-area">
      <WoxViewPage></WoxViewPage>
    </div>
  </div>
</template>
<script>
  export default {
    name: "VixBody"
  }
</script>
<style lang="less" scoped>
  .application-body{
    // padding-top: 44px;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    height: 100%;
    &.hasfooter{
      padding-bottom: 49px;
    }
    &.noheader{
      padding-top: 0;
    }
    .application-body-area{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: auto;
      transform: translate3d(0,0,0);
      -webkit-overflow-scrolling: touch;
      background-color: transparent;
    }
  }
</style>