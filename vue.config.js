const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.VUE_APP_BASE_URL,
  // publicPath: process.env.NODE_ENV === "production" ? "/test/" : "",
  transpileDependencies: ["vuetify"],
});
