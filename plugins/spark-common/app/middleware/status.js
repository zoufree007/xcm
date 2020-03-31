export default async (ctx, next) => {
  if (ctx.isapi) return await next();
  if (ctx.path === '/login') return await next();
  if (ctx.path === '/login/generalize') return await next();
  if (ctx.path === '/login/generalizeOther') return await next();
  if (ctx.path === '/login/googleGeneralize') return await next();
  if (ctx.path === '/login/googleGeneralizeOther') return await next();
  if (ctx.path === '/registered') return await next();
  if (ctx.path === '/registered/privacy') return await next();
  if (ctx.path === '/registered/privacy_h5') return await next();
  const store = ctx.$store;
  let token = store.Meta.get('knock_knock');
  if (token) {
    await getUserInfo(ctx, store);
    return await next();
  }
  token = await ctx.$storage.user.get('knock_knock');
  if (!token) return await ctx.replace('/login', true);
  await next();
}

export async function getUserInfo(ctx, store) {
  const info = store.Meta.get('info');
  if (!info) {
    const result = await ctx.$ajax.post('/user/info');
    store.Meta.commit('info', result.data);
    await ctx.app.emit('get_user_info', result.data);
  }
}