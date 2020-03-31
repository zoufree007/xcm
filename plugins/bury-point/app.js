import Log from './index';
export default (app, plugin) => {
  app.on('beforeCreate', () => {
    app.logger = 
    app.context.logger = new Log(plugin.config.url);
  });
}