<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.5795 17.0469" :style="{width:computedSize, height: computedSize}">
    <path class="path" :style="{fill: color}" d="M2.322,6.0574,8.8929-.5135a1.0561,1.0561,0,0,0,0-1.4935h0a1.0561,1.0561,0,0,0-1.4935,0L.6787,4.7137-.068,5.46a1.0561,1.0561,0,0,0,0,1.4935l.7467.7468,6.7207,6.7206a1.0561,1.0561,0,0,0,1.4935,0h0a1.0561,1.0561,0,0,0,0-1.4935L2.322,6.3569A.2118.2118,0,0,1,2.322,6.0574Z" transform="translate(0.3773 2.3163)"/>
  </svg>
</template>
<script>
  export default {
    name: 'VixWidgetsBack',
    props: {
      size: {
        type: Number,
        default: 14
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
.path{
  fill-rule:evenodd;
}
</style>