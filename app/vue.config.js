const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  devServer: {
    allowedHosts: 'all',
    webSocketServer: 'ws',
    client: {
      webSocketURL: {
        hostname: '0.0.0.0',
        pathname: '/ws',
        port: 8080,
        protocol: 'ws',
      },
    },
  },
});
