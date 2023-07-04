module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.jsx', '.json', '.svg', '.png', '.ts', '.tsx'],
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
      ],
      [
        'module:react-native-dotenv', 
        {
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: false,
          verbose: false
        }
    ]
    ]
  };
};
