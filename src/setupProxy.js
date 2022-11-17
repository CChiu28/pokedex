const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api/**',{
            target: 'https://pokedex-yw3p.onrender.com/',
            changeOrigin: true,
        })
    );
};