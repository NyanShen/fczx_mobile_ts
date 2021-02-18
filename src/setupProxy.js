const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/areaapi', {
    target: 'https://areaapi.fczx.com',
    changeOrigin: true,
    pathRewrite: {
      "^/areaapi": "/" // 把/areaapi 变成空
    }
  }));
  app.use(createProxyMiddleware('/api', {
    target: 'https://api.fczx.com',
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/" // 把/api 变成空
    }
  }));
};