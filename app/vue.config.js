const { defineConfig } = require('@vue/cli-service');

const port = parseInt(process.env.PORT) || 8099;

module.exports = defineConfig({
  devServer: {
    port,
    allowedHosts: 'all',
    webSocketServer: 'ws',
    client: {
      webSocketURL: {
        hostname: '0.0.0.0',
        pathname: '/ws',
        port,
        protocol: 'ws',
      },
    },
  },
});
