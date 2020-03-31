<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" :style="{width: computedSize, height: computedSize}">
    <circle :style="{fill: color}" cx="15.3253" cy="4.168" r="1.75"/>
    <rect :style="{fill: color}" x="4" y="6.75" width="7" height="1.5" transform="translate(9 -1.6066) rotate(45)"/>
    <rect :style="{fill: color}" x="4" y="6.75" width="7" height="1.5" transform="translate(-1.6066 9) rotate(-45)"/>
    <path :style="{fill: color}" d="M14.3911,6.3141A6.9958,6.9958,0,1,1,7.5.5a6.9537,6.9537,0,0,1,2.5682.4945l.9328-1.788A9.0014,9.0014,0,1,0,16.5,7.5a8.9329,8.9329,0,0,0-.1375-1.5089Z" transform="translate(1.5 1.5)"/>
  </svg>
</template>
<script>
  export default {
    name: 'VixWidgetsClose',
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