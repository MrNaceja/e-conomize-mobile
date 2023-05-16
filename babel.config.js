module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.jsx', '.json', '.svg', '.png'],
          alias: {
            components: './src/components',
            screens   : './src/screens',
            assets    : './src/assets',
            theme     : './src/theme',
            utils     : './src/utils'
          }
        }
      ]
    ]
  };
};
