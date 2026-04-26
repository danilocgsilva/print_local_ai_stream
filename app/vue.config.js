const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  devServer: {
    allowedHosts: 'all',
    webSocketServer: 'ws',
    client: {
      webSocketURL: {
        hostname: 'localhost',
        pathname: '/ws',
        port: parseInt(process.env.PORT) || 8081,
        protocol: 'ws',
      },
    },
  },
});
