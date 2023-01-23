const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/join/",
  // publicPath: process.env.NODE_ENV === "production" ? "/join/" : "/",
  transpileDependencies: ["vuetify"],
  pwa: {
    iconPaths: {
      favicon32: "img/favicon.svg",
    },
  },
});
