const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/join/",
  // publicPath: process.env.NODE_ENV === "production" ? "/test/" : "",
  transpileDependencies: ["vuetify"],
});
