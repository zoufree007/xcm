<template>
  <flex blocked class="header">
    <flex class="application-header" blocked valign="middle" :class="{'van-hairline--bottom': $store.state.Vix.header.theme === 'light'}" :style="{'background-color': $store.state.Vix.header.backgroundColor}" v-if="false">
      <flex class="field left-field" :span="1" align="left" valign="middle">
        <VixWidgetsBack :color="textColor" v-if="$store.state.Vix.header.backable&&!$store.state.Vix.header.leftTextBool" @click.native="onGoBack"></VixWidgetsBack>
        <div class="leftText" v-if="$store.state.Vix.header.leftTextBool">{{$store.state.Vix.header.leftText}}</div>
      </flex>
      <flex class="field mid-field" :span="rate" align="center" valign="middle" :style="{color:textColor}">{{$store.state.Vix.header.title}}</flex>
      <flex class="field right-field" :span="1" align="right" valign="middle">
        <flex class="actions" valign="middle" :style="{'border-color': borderColor}" :class="{simple: !$store.state.Vix.header.closeable}">
          <VixWidgetsTool class="tool" :color="textColor" @click.native="sheet=true" v-if="sheetable"></VixWidgetsTool>
          <div class="splitor" :style="{'background-color': borderColor}" v-if="$store.state.Vix.header.closeable"></div>
          <VixWidgetsClose class="tool" :color="textColor" v-if="$store.state.Vix.header.closeable"></VixWidgetsClose>
          <div @click="left" class="leftText" v-if="$store.state.Vix.header.rightTextBool">{{$store.state.Vix.header.rightText}}</div>
        </flex>
      </flex>
    </flex>
    <van-actionsheet v-model="sheet" :actions="$store.state.Vix.header.actions" @select="onSelect" cancel-text="hủy bỏ" />
  </flex>
</template>
<script>
  import Vue from 'vue';
  export default {
    name: 'VixHeader',
    props: {
      rate: Number
    },
    data() {
      return {
        ctx: null
      }
    },
    created() {
      this._handler = ctx => this.ctx = ctx;
      this.$root.$on('enter', this._handler);
    },
    beforeDestroy() {
      if (this._handler) {
        this.$root.$off('enter', this._handler);
      }
    },
    computed: {
      textColor() {
        return this.$store.Vix.get('header:text-color');
      },
      borderColor() {
        return this.$store.Vix.get('header:border-color');
      },
      sheetable() {
        return this.$store.Vix.get('header:sheetable');
      },
      sheet: {
        get() {
          return this.$store.Vix.get('header.toolStatus');
        },
        set(value) {
          this.$store.Vix.commit('header.toolStatus', value);
        }
      }
    },
    data() {
      return {
        loading: false
      }
    },
    methods: {
      left(){
        this.$redirect('/login',true);
      },
      onSelect(item) {
        if (this.loading) return;
        if (!item.event) return this.sheet = false;
        if (!this.ctx || !this.ctx.listenerCount(item.event)) return this.sheet = false;
        Vue.set(item, 'loading', true);
        this.loading = true;
        const close = () => {
          Vue.set(item, 'loading', false);
          this.sheet = false;
          this.loading = false;
        }
        this.ctx.emit(item.event, close).then(() => {
          if (this.sheet) {
            close();
          }
        }).catch(e => this.$app.emit('error', e).then(close).then(() => Promise.reject(e)));
      },
      onGoBack() {
        const fn = this.$store.state.Vix.header.backCallback;
        if (typeof fn === 'function') {
          fn();
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.header{
  position: fixed;
  top:0;
  left:0;
  z-index: 1000;
}
.leftText{
  color: black;
  font-size: 16px;
}
// .application-header{
//   height:44px;
//   color:#fff;
//   .field{
//     padding: 0px 10px;
//     &.mid-field{
//       font-size:16px;
//       font-weight: 500;
//     }
//     &.right-field{
//       .actions{
//         height: 28px;
//         border:1px solid; /*px*/
//         border-radius: 14px;
//         .tool{
//           margin: 10px;
//           &:first-child{
//             margin-right: 0;
//           }
//           &:last-child{
//             margin-left: 0;
//           }
//         }
//         .splitor{
//           width: 1px; /*px*/
//           height: 10px;
//           background-color: #eee;
//           margin: 0 12px;
//         }
//         &.simple{
//           border:0;
//         }
//       } 
//     }
//   }
// }
</style>