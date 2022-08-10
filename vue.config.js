const path = require("path");

module.exports = {
  publicPath: "/",
  outputDir: path.resolve(__dirname, "dist/"),
  indexPath: "index.html",
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          path: __dirname,
        },
      },
    },
  },
};
