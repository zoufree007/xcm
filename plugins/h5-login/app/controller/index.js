import { 
  Http,
  Controller,
  Interface,
  Middleware
} from '@wox/wox';
import InjectionMiddleware from '../middleware/i18n';

import loginService from '../service/register';

import registerPage from '../webview/register/index.vue';
import privacyPage from '../webview/privacy/index.vue';
import privacy_h5 from '../webview/privacy_h5/index.vue';

@Controller('/registered')
export default class {

  @Http.Get('/')
  @Middleware(InjectionMiddleware(true))
  async create() {
    await this.ctx.render(registerPage);
  }

  @Http.Get('/privacy')
  @Middleware(InjectionMiddleware(true))
  async privacy() {
    await this.ctx.render(privacyPage);
  }
  @Http.Get('/privacy_h5')
  @Middleware(InjectionMiddleware(true))
  async privacy_h5() {
    this.ctx.$header.title = "注册隐私协议";
    
    await this.ctx.render(privacy_h5);
  }
  @Http.Post('/saveUserBehavior')
  @Interface.Service('register', loginService)
  async saveUserBehavior({ Service }) {
    const body = this.ctx.req.body;
    return await Service.login.saveUserBehavior( body );
  }
  @Http.Post('/getImg')
  @Interface.Service('registered', loginService)
  async sccesstoken({ Service }) {
    const querys = this.ctx.query;
    const res = await Service.registered.getImg(querys);
  }
  @Http.Post('/register')
  @Interface.Service('registered', loginService)
  async register({ Service }) {
    const body = this.ctx.req.body;
    return await Service.registered.register( body );
  }
  @Http.Post('/pvuv')
  @Interface.Service('registered', loginService)
  async pvuv({ Service }) {
    const body = this.ctx.req.body;
    return await Service.registered.pvuv( body );
  }
  @Http.Post('/sendSms')
  @Interface.Service('registered', loginService)
  async sendSms({ Service }) {
    const body = this.ctx.req.body;
    return await Service.registered.sendSms( body );
  }
  @Http.Post('/channelCodeDecryption')
  @Interface.Service('registered', loginService)
  async channelCodeDecryption({ Service }) {
    const body = this.ctx.req.body;
    return await Service.registered.channelCodeDecryption( body );
  }
}