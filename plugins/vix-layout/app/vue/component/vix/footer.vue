<template>
  <flex class="application-footer" blocked valign="middle" v-if="$store.state.Vix.footer.show">
    <flex 
      class="tab" :span="1" align="center" valign="middle" 
      v-for="tab in $store.state.Vix.footer.fields" :key="tab" 
      @click.native="onSelect(tab)"
    >
      <component :is="tab" :ref="tab"></component>
    </flex>
  </flex>
</template>
<script>
  export default {
    name: 'VixFooter',
    data() {
      return {
        current: null
      }
    },
    mounted() {
      const refs = this.$refs;
      for (const channel in refs) {
        this.emit(refs[channel], 'mount');
      }
    },
    methods: {
      onSelect(component) {
        const refs = this.$refs;
        for (const channel in refs) {
          if (channel === component) {
            this.emit(refs[channel], 'select');
          } else {
            this.emit(refs[channel], 'unselect');
          }
        }
      },
      emit(target, event, ...args) {
        if (Array.isArray(target)) {
          target.forEach(item => item.$emit(event, ...args));
        } else {
          target.$emit(event, ...args);
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.application-footer{
  height: 49px;
}
</style>