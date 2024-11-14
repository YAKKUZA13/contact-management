module.exports = {
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions = {
          ...(options.compilerOptions || {}),
          isCustomElement: tag => tag.startsWith("ion-") // например, если есть кастомные элементы
        };
        return options;
      });
  },
  lintOnSave: false, // Временно отключить линтинг
};
