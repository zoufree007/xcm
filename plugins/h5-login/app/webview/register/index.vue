<template>
  <flex :class="{'page' : showPage}" valign="middle">
    <flex blocked align="center" class="cont" v-if="showPage">
      <flex style="width:90%;background:#ffffff;border-radius:5px;" align="center" valign="middle" direction="column">
        <input v-model="mobilePhone" class="input" type="number" maxlength="11" :placeholder=placePhone style="width:90%;margin-top:20px;">
        <!-- <flex style="width:90%;margin-top:20px;" valign="middle"  align="between">
          <input @focus="refesh" v-model="imgCode" class="input" type="text" maxlength="4" placeholder='请输入图形验证码'>
          <flex align="center" valign="middle" class="code" @click.native="getImg" v-if="imgShow">获取图形验证码</flex>
          <flex align="center" valign="middle" @click.native="getImg" v-else>
            <img height="30" width="100" :src="img" alt="">
          </flex>
        </flex> -->
        <flex style="width:90%;margin-top:20px;" valign="middle" align="between">
          <input v-model="validateCode" class="input" type="text" placeholder='请输入验证码'>
          <flex align="center" valign="middle" class="code" @click.native="getCode()">{{!show ? codeMsg : `${count}S`}}</flex>
        </flex>
         <van-button type="warning" :loading="loading" class="btn" @click.native="submit">立即拿钱</van-button>
         <div style="padding-bottom:10px;font-size:12px;transform:scale(0.9);color:#666666;">点击”立即拿钱“按钮即代表已阅读并同意 <span @click="privacy">《用户注册协议》</span></div>
      </flex>
    </flex>
    <flex align="center" valign="middle" fulled blocked v-else style="font-size:30px;color:black;height:100%;">
      <img src="../../assets/WechatIMG15.jpeg" alt="" style="width:100%;height:100%;">
    </flex>
    <van-popup
      v-model="show1"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div>
        <flex align="right" style="padding:5px 10px;font-size:14px;" @click.native="show1=false">X</flex>
        <div blocked style="padding:20px;line-height:24px;">
           <span style="color:#F9A447;font-size:16px;">小贴士:</span><br>
        安装成功后，在手机里找到<br>
        <span style="font-weight:600;">[设置]</span>—<span style="font-weight:600;">[通用]</span>—<span style="font-weight:600;">[设备管理]</span>—<span style="font-weight:600;">[相关app应用授权]</span>...,再点击<span style="font-weight:600;">[信任...]</span>即可使用APP。
        </div>
      </div>
    </van-popup>
  </flex>
</template>
<script>
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/QQ/i) == "qq") {
        return true;
    } else {
        return false;
    }
}
  export default {
    name: "IndexPage",
    data() {
      return {
        show1:false,
        validateCode:null,
        mobilePhone:null,
        loading:false,
        placePhone:this.$lang('common_phone_input_placeholder'),
        placeUsername:this.$lang('name'),
        img:null,
        imgShow:true,
        imgCode:null,
        timer: null,
        show:false,
        count: '',
        showCode:true,
        codeMsg:'获取验证码',
        payload:null,
        showPage:true,
        channelCode:null,
      }
    },
    async created(){
      if(isWeiXin()) {
        this.showPage = false;
        document.title = '404';
        return;
      } 
      try{
        // await this.getd();
        // console.log(this.$store.Meta.get('channel'))
        const { msg}  = await this.$post('/registered/channelCodeDecryption' , {channelCode:this.$store.Meta.get('channel')});
        this.channelCode = msg;
        this.showPage = true;
        let d = {
          appName:"hongshuangxi",
          bizType:3,
          channelCode:this.channelCode,
          deviceType:3,
          type:1,
        }
        try{
          await this.$post('/registered/pvuv', d);
          this.showPage = true;
        }
        catch{
          this.showPage = true;
        }
      }
      catch{
        this.showPage = false;
      }
    },
    methods: {
      privacy(){
        // window.open('https://www.fasion.com.cn/h5-app/#/registered/privacy');
        this.$redirect('/registered/privacy', true);
      },
      async getd(){
        this.imgShow = false;
        this.img = "https://www.fasion.com.cn/supermarket/user/getAuthCodeImg?tel=" + this.mobilePhone + '&time=' + Date.parse(new Date());
      },
      async getImg(){
        if(this.mobilePhone == null || this.mobilePhone == ''){
          this.$toast('请先填写手机号');
          return;
        }else if(!(/^1[3456789]\d{9}$/.test(this.mobilePhone))){
          this.$toast('请输入正确的手机号');
          return;
        };
        this.imgShow = false;
        this.img = "https://www.fasion.com.cn/supermarket/user/getAuthCodeImg?tel=" + this.mobilePhone + '&time=' + Date.parse(new Date());
      },
      refesh(){
        this.getImg();
      },
      async getCode(){
        if(this.mobilePhone == null || this.mobilePhone == ''){
          this.$toast('请先填写手机号');
          return;
        }else if(!(/^1[3456789]\d{9}$/.test(this.mobilePhone))){
          this.$toast('请输入正确的手机号');
          return;
        }
        // else if(this.imgCode == null || this.imgCode == '' || this.imgShow){
        //   this.$toast('请先填写图形验证码');
        //   return;
        // }
        this.payload = new FormData();
        // this.payload.set('imgCode', this.imgCode);
        this.payload.set('mobile', this.mobilePhone)
        if(this.show) return;
        try{
          await this.$post('/registered/sendSms', this.payload);
          this.$toast('短信发送成功');
          const TIME_COUNT = 60;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = true;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
              } else {
                this.show = false;
                clearInterval(this.timer);
                this.timer = null;
                this.codeMsg = '重新获取验证码';
              }
            }, 1000);
          }
        }
        catch{
          this.getImg();
        }
      },
      async submit(){
        if(this.mobilePhone == null || this.mobilePhone == ''){
          this.$toast('请先填写手机号');
          return;
        }else if(!(/^1[3456789]\d{9}$/.test(this.mobilePhone))){
          this.$toast('请输入正确的手机号');
          return;
        }
        // else if(this.imgCode == null || this.imgCode == '' || this.imgShow){
        //   this.$toast('请先填写图形验证码');
        //   return;
        // }
        else if(this.validateCode == null || this.validateCode == ''){
          this.$toast('请填写验证码');
        }
        let params = {
          channelCode:this.channelCode,
          deviceType:3,
          mobilePhone:this.mobilePhone,
          validateCode:this.validateCode,
          appName:"hongshuangxi",
          loginType:1,
        }
        try{
         const data = await this.$post('/registered/register', params);
         if(data.code == 1000) {
           await this.$dialog.confirm({
            message: '恭喜您注册成功，快去下载app登录吧'
            }).then(() => {
              if(window.NX.env == 'IOS'){
                this.show1 = true;
                let a = "itms-services://"
                let b = "?action=download-manifest&url=https://gitee.com/xingxingstyle/plist/raw/master/xcm.plist";
                window.location.href = a+b;
              }else if(window.NX.env == 'ANDROID') {
                window.location.href = "https://www.fasion.com.cn/download/apps/xiaocaimao.apk";
              }
            }).catch(() => {});
            let d = {
              appName:"hongshuangxi",
              bizType:3,
              channelCode:this.channelCode,
              deviceType:3,
              mobilePhone:this.mobilePhone,
              type:1,
              userId:data.data.userinfo.id,
            }
          await this.$post('/registered/pvuv', d);
         }
         else if(data.code == 1005) {
           await this.$dialog.confirm({
            message: '您已注册过，快去下载app登录吧'
            }).then(() => {
              if(window.NX.env == 'IOS'){
                this.show1 = true;
                let a = "itms-services://"
                let b = "?action=download-manifest&url=https://gitee.com/xingxingstyle/plist/raw/master/xcm.plist";
                window.location.href = a + b;
              }else if(window.NX.env == 'ANDROID') {
                window.location.href = "https://www.fasion.com.cn/download/apps/xiaocaimao.apk";
              }
            }).catch(() => {});
              let d = {
              appName:"hongshuangxi",
              bizType:3,
              channelCode:this.channelCode,
              deviceType:3,
              mobilePhone:this.mobilePhone,
              type:1,
            }
            await this.$post('/registered/pvuv', d);
          }
        }
        catch(e){
           let d = {
              appName:"hongshuangxi",
              bizType:3,
              channelCode:this.channelCode,
              deviceType:3,
              mobilePhone:this.mobilePhone,
              type:1,
            }
            await this.$post('/registered/pvuv', d);
        }
      },
    }
  }
</script>
<style lang="less" scoped>
.page{
  width:100%;
  height: 100%;
  box-sizing: border-box;
  background: url('../../assets/WechatIMG135.jpeg') no-repeat;
  background-size: cover;
  background-color: rgba(252,150,38);
  position: relative;
  .cont{
    position: absolute;
    bottom:100px;
  }
}
.canPost{
  background-color: rgba(249, 164, 71, .7)!important;
}
.chose{
  color: #F9A447!important;
  border-color: #F9A447!important;
}
.mt{
  margin-top: 12px;
}  
.mb{
  margin-bottom: 16px;
}
.input{
  border:none;
  font-size: 14px;
  border-radius: 6px;
  line-height: 34px;
  text-indent: 10px;
  background-color: #f5f5f5;
}
.code{
  background-color:#F9A447;
  line-height: 34px;
  border-radius: 6px;
  padding:0 20px;
  color:#ffffff;
}
.btn{
  width: 90%;
  background-color: #F9A447;
  border-radius:6px;
  margin-top: 20px;
  margin-bottom:20px;
}
input::-webkit-input-placeholder{
    color:#D2CBDB;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#D2CBDB;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#D2CBDB;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#D2CBDB;
}
</style>