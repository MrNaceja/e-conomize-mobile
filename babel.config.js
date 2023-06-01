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
            routes    : './src/routes',
            assets    : './src/assets',
            contexts  : './src/contexts',
            reducers  : './src/reducers',
            hooks     : './src/hooks',
            theme     : './src/theme',
            utils     : './src/utils'
          }
        }
      ]
    ]
  };
};
