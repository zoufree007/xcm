export default class {
  async get_accesstoken(options = {}){
    const querys = [];
    for (const i in options) {
      querys.push(`${i}=${options[i]}`);
    }
    let url = '/v1.0/basic/dialog/sms_login';
    if (querys.length) url += '?' + querys.join('&');
    return await this.ctx.$ajax.get(url)
  }

  async getImg(options = {}){
    const querys = [];
    for (const i in options) {
      querys.push(`${i}=${options[i]}`);
    }
    let url = '/supermarket/user/getAuthCodeImg';
    if (querys.length) url += '?' + querys.join('&');
    return await this.ctx.$ajax.get(url);
  }

  async faceBookToken(params) {
    return await this.ctx.$ajax.post('/user/login/facebookSecret', params);
  }

  async getCeilPeriodConfig(params) {
    return await this.ctx.$ajax.post('/loan/getCeilPeriodConfig', params);
  }

  async apply(params) {
    return await this.ctx.$ajax.post('/aurora/apply/v1?partner_code=mzf_vn&partner_key=24f9aa936f3f44e8aa1c534d9174d8d2&app_name=viban_web', 
    params,
     { headers: 
      {'content-type': 'application/x-www-form-urlencoded'}
    });
  }

  async saveUserBehavior(params) {
    if(this.ctx.app.$getNewCustom().saveAction == true) {
      return await this.ctx.$ajax.post('/user/saveUserBehavior', params);
    }
    else return;
  }
  async sendSms(params) {
    return await this.ctx.$ajax.post('/supermarket/sms/sendSms', params);
  }
  async register(params) {
    return await this.ctx.$ajax.post('/supermarket/user/login', params);
  }
  async pvuv(params){
    return await this.ctx.$ajax.post('/supermarket/pvuv/addPvUv', params);
  }
  async channelCodeDecryption(params){
    return await this.ctx.$ajax.post('/supermarket/channel/channelCodeDecryption', params);
  }
 }