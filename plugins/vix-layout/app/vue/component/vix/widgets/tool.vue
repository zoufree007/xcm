<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 5" :style="{width:computedSize, height: computedSize}">
    <circle :style="{fill: color}" cx="8.5" cy="2.5" r="2.5"/>
    <circle :style="{fill: color}" cx="2" cy="2.6" r="2"/>
    <circle :style="{fill: color}" cx="15" cy="2.6" r="2"/>
  </svg>
</template>
<script>
  export default {
    name: 'VixWidgetsTool',
    props: {
      size: {
        type: Number,
        default: 16
      },
      color: {
        type: String,
        default: '#000000'
      }
    },
    computed: {
      computedSize() {
        return this.size + 'px';
      }
    }
  }
</script>
<style lang="less" scoped>
</style>