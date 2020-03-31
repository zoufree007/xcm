export default language => {
  return async (ctx, next) => {
    ctx.language = ctx.app.$store.Meta.get('language');
    if(ctx.query.appName) ctx.appName = ctx.query.appName;
    else ctx.appName = null;
    await next();
  }
}