export default async (ctx, next) => {
  const LocalStorageChannel = window.localStorage.getItem('channel');;
  const QueryStringChannel = ctx.query && ctx.query.channel ? ctx.query.channel : '';
  const VuexStoreCahnnel = ctx.app.context.$store.Meta.get('channel');
  const localStorageAppName = window.localStorage.getItem('appName');
  const QueryStringAppName = ctx.query && ctx.query.appName ? ctx.query.appName : '';
  const VuexStoreAppName = ctx.app.context.$store.login.get('appName');
  const state = ctx.query && ctx.query.state;
  if(state){
    ctx.app.context.$store.Meta.commit('channel', JSON.parse(LocalStorageChannel));
    ctx.app.context.$store.login.commit('appName', JSON.parse(localStorageAppName));
  }else{
    if (
      LocalStorageChannel   !==   QueryStringChannel || 
      QueryStringChannel    !==   VuexStoreCahnnel ||
      LocalStorageChannel   !==   VuexStoreCahnnel
    ) {
      window.localStorage.setItem('channel', JSON.stringify(QueryStringChannel.replace(/\s+/g,'+')));
      ctx.app.context.$store.Meta.commit('channel', QueryStringChannel.replace(/\s+/g,'+')  || VuexStoreCahnnel);
      window.localStorage.setItem('appName', JSON.stringify(QueryStringAppName));
      ctx.app.context.$store.login.commit('appName', QueryStringAppName  || VuexStoreAppName);
    }
  }
  await next();
}